const bcrypt = require('bcryptjs');
import { v4 as uuid4 } from 'uuid';

const jwt = require('jsonwebtoken');

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ApiNotFoundResponse } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';

import { AccountStatus } from 'src/common/enum/account.status.enum';
import { AuthStatus } from 'src/common/enum/auth.status.enum';
import { CreateAccountRequest } from 'src/common/requests/create.account.dto';
import { HasJoinedRequest } from 'src/common/requests/has.joined.dto';
import { JoinRequest } from 'src/common/requests/join.dto';
import { LoginUserRequest } from 'src/common/requests/login.user.dto';
import { RegisterUserRequest } from 'src/common/requests/register.user.dto';
import { AuthSession } from 'src/entities/auth_session.dto';
import { User } from 'src/entities/user.dto';
import { Repository } from 'typeorm';
import { TextureTypes } from 'src/common/enum/textures.enum';
import { PATH_TO_TEXTURES } from 'src/const';
import { UserService } from 'src/user/user.service';
import { LoginResultRequest } from 'src/common/requests/login.result.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthSession)
    private readonly authRepository: Repository<AuthSession>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
  ) {}

  async loginUser({
    nickname,
    password,
  }: LoginUserRequest): Promise<LoginResultRequest> {
    let loginStatus: AuthStatus;

    const user = (await this.userRepository.findOne({
      nickname,
    })) as User;

    if (!user) {
      loginStatus = AuthStatus.NO_SUCH_USER;
      throw new NotFoundException({ msg: 'Такого пользователя нет' });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      loginStatus = AuthStatus.WRONG_PASSWORD;
      throw new BadRequestException({ msg: 'Неправильный никнейм / пароль' });
    }

    loginStatus = AuthStatus.SUCCESSFUL;

    await this.authRepository.save({
      nickname,
      status: loginStatus,
    });

    delete user.password;
    delete user.serverId;

    const token = jwt.sign(
      { nickname: user.nickname, skinUrl: user.skinUrl },
      process.env.JWT_TOKEN,
    );

    return { nickname: user.nickname, token };
  }

  async syncWithClient(token: string) {
    try {
      const { nickname }: { nickname: string } = jwt.verify(
        token,
        process.env.JWT_TOKEN,
      );

      return await this.userService.getUser(nickname, true);
    } catch (err) {
      throw new BadRequestException({ msg: 'Неверный токен синхронизации' });
    }
  }

  async createAccount({
    nickname,
    password,
    generatePassword,
  }: CreateAccountRequest) {
    const existingUser = await this.userRepository.findOne({ nickname });

    if (existingUser) {
      throw new BadRequestException({ msg: 'Этот пользователь уже создан' });
    }

    const salt = bcrypt.genSaltSync(10);

    const randomPassword = (Math.random() + 1).toString(36).substring(5);

    const newPassword = bcrypt.hashSync(
      generatePassword ? randomPassword : password,
      salt,
    );

    await this.userRepository.save({
      nickname,
      password: newPassword,
      uuid: uuid4().replace(/-/g, ''),
    });

    return { nickname, password: generatePassword ? randomPassword : password };
  }

  changeAccountStatus(nickname: string, status: AccountStatus) {}

  async getSessionHistory(nickname: string) {
    return await this.authRepository.find({ nickname });
  }

  async join(data: JoinRequest) {
    const uuid = data.selectedProfile;
    const accessToken = data.accessToken;

    try {
      const user = (await this.userRepository.findOne({
        uuid,
      })) as User;

      if (user.accessToken !== accessToken) {
        throw new NotFoundException({
          errorMessage:
            'Ошибка авторизации (ACCESS TOKEN). Возможно вам стоит перезайти в игру через лаунчер',
          error: 'Auth',
          cause: '',
        });
      }

      await this.userRepository.delete({
        id: user.id,
      });

      await this.userRepository.save({
        id: user.id,
        ...user,
        serverId: data.serverId,
      });

      console.log(
        `${user.nickname} инициирует соединение с сервером`,
        new Date(),
      );

      return { uuid, nickname: user.nickname } as User;
    } catch (err) {
      console.log(`${uuid} не смог инициировать соединение`, new Date());
      console.log(err);
      throw new NotFoundException({
        errorMessage:
          'Ошибка авторизации. Возможно вам стоит перезайти в игру через лаунчер',
        error: 'Auth',
        cause: '',
      });
    }
  }

  async hasJoined({ username, serverId }: HasJoinedRequest) {
    try {
      const user = (await this.userRepository.findOne({
        nickname: username,
      })) as User;

      if (!user || user.serverId !== serverId) {
        console.log(`${username} Bad server Id`);
        throw new NotFoundException({
          errorMessage:
            'Ошибка авторизации. Походу вы используете не официальный лаунчер Мегабаттла.',
          error: 'Auth',
          cause: '',
        });
        return;
      }

      await this.userRepository.delete({
        id: user.id,
      });

      await this.userRepository.save({
        id: user.id,
        ...user,
        serverId,
      });

      console.log(`${username} подключился`, new Date());

      return this.getProfile(user.uuid);
    } catch (err) {
      console.log(`${username} не смог подключиться`, new Date());
      console.log(err);
      return;
    }
  }

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  async getProfile(uuid: string) {
    const user = (await this.userRepository.findOne({
      uuid,
    })) as User;

    const skins = [
      'https://www.minecraftskins.com/uploads/skins/2021/05/29/steve--with-hoodie--17960601.png',
      'https://www.minecraftskins.com/uploads/skins/2021/10/30/steve-s-halloween-costume-19236802.png',
      'https://www.minecraftskins.com/uploads/skins/2021/12/30/steve-hoodie-19614156.png',
      'https://www.minecraftskins.com/uploads/skins/2021/12/12/steve-hoodie-19513406.png',
      'https://www.minecraftskins.com/uploads/skins/2021/11/27/young-steve-19412406.png',
      'https://www.minecraftskins.com/uploads/skins/2021/10/10/minecraft-blue-jacket-hoodie-steve-19096857.png',
    ];

    const DOMAIN_URL = 'https://mbtl.ru/';

    const index = skins.length - 1;
    const skinUrl = user.skinUrl
      ? DOMAIN_URL + user.skinUrl
      : skins[this.randomIntFromInterval(0, index)];

    const capeUrl = user.capeUrl ? DOMAIN_URL + user.capeUrl : '';

    const textures = { SKIN: { url: skinUrl }, CAPE: { url: capeUrl } };

    const res = {
      id: user.uuid,
      name: user.nickname,
      properties: [
        {
          name: 'textures',
          value: btoa(
            JSON.stringify({
              timestamp: +new Date(),
              profileId: user.uuid,
              profileName: user.nickname,
              textures,
            }),
          ),
          signature: '',
        },
      ],
    };

    return res;
  }

  async getSkinURL(nickname: string, textureType: TextureTypes) {
    const path = `${PATH_TO_TEXTURES}${textureType.toLowerCase()}/${nickname}.png`;

    return path;
  }
}
