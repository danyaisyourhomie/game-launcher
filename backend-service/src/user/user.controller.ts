import { Get } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Patch } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { User } from 'src/entities/user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Get('/:nickname')
  async getUser(@Param('nickname') nickname: string) {
    return await this.userService.getUser(nickname);
  }

  @Patch('/:nickname')
  async updateUser(
    @Param('nickname') nickname: string,
    @Body() data: Partial<User>,
  ) {
    return await this.userService.updateUser(nickname, data);
  }
}
