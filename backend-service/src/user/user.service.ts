import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAllUsers() {
    return await this.userRepository.find();
  }

  async getUser(nickname: string) {
    return await this.userRepository.find({ nickname });
  }

  async updateUser(nickname: string, data: Partial<User>) {
    return await this.userRepository.save({ nickname, ...data });
  }
}
