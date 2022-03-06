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

      return await this.userService.getUser(nickname);
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

    const newUser = await this.userRepository.save({
      nickname,
      password: newPassword,
    });

    return { nickname, password: generatePassword ? randomPassword : password };
  }

  changeAccountStatus(nickname: string, status: AccountStatus) {}

  async getSessionHistory(nickname: string) {
    return await this.authRepository.find({ nickname });
  }

  async join(data: JoinRequest) {
    const uuid = data.selectedProfile.replace('-', '');
    const accessToken = data.accessToken;

    try {
      const user = (await this.userRepository.findOne({ accessToken })) as User;

      if (!user || user.uuid.replace('-', '') !== uuid) {
        throw new NotFoundException({ error: 'Invalid user credentials' });
      }

      await this.userRepository.save({
        ...user,
        serverId: data.serverId,
        accessToken: uuid4(),
      });

      return { uuid: user.uuid, nickname: user.nickname } as User;
    } catch (err) {
      console.log(err);
      throw new NotFoundException({ error: 'Invalid user credentials' });
    }
  }

  async hasJoined({ username, serverId }: HasJoinedRequest) {
    try {
      const user = (await this.userRepository.findOne({
        nickname: username,
      })) as User;

      if (!user) {
        throw new NotFoundException({ error: 'Invalid user name' });
      }

      await this.userRepository.save({ ...user, serverId });

      // return { uuid: user.uuid, nickname: user.nickname } as User;

      return this.getProfile(user.uuid);
    } catch (err) {
      console.log(err);
      throw new NotFoundException({ error: 'Invalid user credentials' });
    }
  }

  async getProfile(uuid: string) {
    const user = (await this.userRepository.findOne({
      uuid,
    })) as User;

    const skinUrl = 'https://s.namemc.com/i/2180771ff87a0c5e.png';
    const capeUrl =
      'https://tlauncher.org/upload/all/cloak/414673518322a453535e84419e9fb8c1.png';

    const textures = [{ SKIN: [{ url: skinUrl }], CAPE: [{ url: capeUrl }] }];

    const res = {
      id: uuid,
      name: user.nickname,
      properties: [
        {
          name: 'textures',
          value: btoa(
            JSON.stringify({
              timestamp: new Date(),
              profileId: uuid,
              profileName: user.nickname,
              textures: {
                SKIN: { url: skinUrl },
                CAPE: { url: capeUrl },
              },
            }),
          ),
          signature:
            '3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2',
        },
      ],
    };

    console.log(res.toString());

    return res;
  }

  async getSkinURL(nickname: string, textureType: TextureTypes) {
    const path = `${PATH_TO_TEXTURES}${textureType.toLowerCase()}/${nickname}.png`;

    return path;
  }
}
