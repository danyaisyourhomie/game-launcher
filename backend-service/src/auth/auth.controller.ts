import { Query } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AccountStatus } from 'src/common/enum/account.status.enum';
import { CreateAccountRequest } from 'src/common/requests/create.account.dto';
import { HasJoinedRequest } from 'src/common/requests/has.joined.dto';
import { JoinRequest } from 'src/common/requests/join.dto';
import { LoginResultRequest } from 'src/common/requests/login.result.dto';
import { LoginUserRequest } from 'src/common/requests/login.user.dto';
import { RegisterUserRequest } from 'src/common/requests/register.user.dto';
import { TokenVerifyRequest } from 'src/common/requests/token.verify.dto';
import { User } from 'src/entities/user.dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async loginUser(@Body() data: LoginUserRequest): Promise<LoginResultRequest> {
    return await this.authService.loginUser(data);
  }

  @Post('/createAccount')
  async createAccount(@Body() account: CreateAccountRequest) {
    return await this.authService.createAccount(account);
  }

  @Get('/changeAccountStatus/:nickname/:status')
  async changeAccountStatus(
    @Param('nickname') nickname: string,
    @Param('status') status: AccountStatus,
  ) {}

  @Post('/sync/')
  async syncWithClient(@Body() { token }: TokenVerifyRequest) {
    return await this.authService.syncWithClient(token);
  }

  @Get('/sessionHistory/:nickname')
  async getSessionHistory(@Param('nickname') nickname: string) {}

  // Server endpoints

  @Post('join.php')
  async join(@Body() data: JoinRequest) {
    if (!data.accessToken || !data.selectedProfile) {
      throw new BadRequestException({
        error: 'Invalid user data. Something is missing',
      });
    }

    console.log(data);

    return await this.authService.join(data);
  }

  @Get('hasJoined.php')
  async hasJoined(@Query() data: HasJoinedRequest) {
    console.log(data);

    if (!data.username || !data.serverId) {
      throw new BadRequestException({
        error: 'Invalid user data. Something is missing',
      });
    }

    return await this.authService.HasJoined(data);
  }
}
