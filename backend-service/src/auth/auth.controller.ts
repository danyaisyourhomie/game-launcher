import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AccountStatus } from 'src/common/enum/account.status.enum';
import { CreateAccountRequest } from 'src/common/requests/create.account.dto';
import { LoginUserRequest } from 'src/common/requests/login.user.dto';
import { RegisterUserRequest } from 'src/common/requests/register.user.dto';
import { User } from 'src/entities/user.dto';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async loginUser(@Body() data: LoginUserRequest): Promise<User> {
    return await this.authService.loginUser(data);
  }

  @Post('/createAccount')
  createAccount(@Body() account: CreateAccountRequest) {}

  @Get('/changeAccountStatus/:nickname/:status')
  changeAccountStatus(
    @Param('nickname') nickname: string,
    @Param('status') status: AccountStatus,
  ) {}

  @Get('/sessionHistory/:nickname')
  getSessionHistory(@Param('nickname') nickname: string) {}
}
