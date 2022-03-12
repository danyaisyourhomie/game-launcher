import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async linkUserTexture(
    nickname: string,
    filename: string,
    type: 'CAPE' | 'SKIN',
  ) {
    const user = await this.userRepository.findOne({ nickname });

    if (!user) {
      throw new NotFoundException({ msg: 'No such user' });
    }

    if (type === 'CAPE') {
      console.log(`${nickname} обновил плащ`);

      return await this.userRepository.update(
        {
          id: user.id,
        },
        { capeUrl: 'static/cape/' + filename },
      );
    }

    console.log(`${nickname} обновил скин`);

    return await this.userRepository.update(
      {
        id: user.id,
      },
      { skinUrl: filename },
    );
  }
}
