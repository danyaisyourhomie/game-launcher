const bcrypt = require('bcryptjs');
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AccountStatus } from 'src/common/enum/account.status.enum';
import { CreateAccountRequest } from 'src/common/requests/create.account.dto';
import { LoginUserRequest } from 'src/common/requests/login.user.dto';
import { RegisterUserRequest } from 'src/common/requests/register.user.dto';
import { AuthSession } from 'src/entities/auth_session.dto';
import { User } from 'src/entities/user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthSession)
    private readonly authRepository: Repository<AuthSession>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async loginUser({ nickname, password }: LoginUserRequest): Promise<User> {
    await this.authRepository.create({ nickname });

    const user = await this.userRepository.findOne({
      nickname,
    });

    if (!user) {
      throw new NotFoundException({ msg: 'Такого пользователя нет' });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new BadRequestException({ msg: 'Неправильный никнейм / пароль' });
    }

    return user;
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
}
