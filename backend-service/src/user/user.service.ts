import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.dto';
import { Repository } from 'typeorm';

import { v4 as uuid4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAllUsers() {
    return await this.userRepository.find();
  }

  async getUser(nickname: string, omitGeneration: boolean) {
    const user = await this.userRepository.findOne({ nickname });

    delete user.password;
    delete user.id;
    delete user.updatedAt;

    return user;
  }

  async updateUser(nickname: string, data: Partial<User>) {
    return await this.userRepository.save({ nickname, ...data });
  }
}
