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
    const uuid = data.selectedProfile;
    const accessToken = data.accessToken;

    try {
      const user = (await this.userRepository.findOne({ uuid })) as User;

      if (!user || user.accessToken !== accessToken) {
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

  async HasJoined({ username, serverId }: HasJoinedRequest) {
    try {
      const user = (await this.userRepository.findOne({
        nickname: username,
      })) as User;

      if (!user || user.serverId !== serverId) {
        throw new NotFoundException({ error: 'Invalid user credentials' });
      }

      return { uuid: user.uuid, nickname: user.nickname } as User;
    } catch (err) {
      console.log(err);
      throw new NotFoundException({ error: 'Invalid user credentials' });
    }
  }

  async getProfile(uuid: string, nickname: string) {
    return {
      id: uuid,
      name: nickname,
      properties: [
        [
          {
            name: 'textures',
            value: btoa(
              JSON.stringify({
                timestamp: new Date(),
                profileId: uuid,
                profileName: nickname,
                textures: {},
              }),
            ),
          },
        ],
      ],
    };
  }

  async getSkinURL(nickname: string, textureType: TextureTypes) {
    const path = `${PATH_TO_TEXTURES}${textureType.toLowerCase()}/${nickname}.png`;

    return path;
  }
}
