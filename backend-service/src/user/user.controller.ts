import { Get } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Patch } from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common';
import { UploadedFile } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { diskStorage } from 'multer';

import fs from 'fs';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { User } from 'src/entities/user.dto';
import { FileExtender } from 'src/interceptors/FileExtender';
import { UserService } from './user.service';
import { TextureTypes } from 'src/common/enum/textures.enum';

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

  @Post('upload/skin')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nickname: { type: 'string' },
        skin: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('skin', {
      storage: diskStorage({
        destination: './public/skin',
        filename: (req, file, cb) => {
          // Generating a 32 random chars long string
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          //Calling the callback passing the random name generated with the original extension name
          cb(null, `${randomName}.png`);
        },
      }),
    }),
  )
  uploadSkin(@UploadedFile('file') file, @UploadedFile('nickname') nickname) {
    console.log(file);
    console.log(nickname);

    fs.renameSync(
      `./public/skin/${file.filename}.png`,
      `./public/skin/newName.png`,
    );
  }

  // @ApiConsumes('multipart/form-data')
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       nickname: { type: 'string' },
  //       cape: {
  //         type: 'string',
  //         format: 'binary',
  //       },
  //     },
  //   },
  // })
  // @Post('upload/cape')
  // @UseInterceptors(FileInterceptor('cape', { dest: './public/cape' }))
  // uploadCape(@UploadedFile() cape) {
  //   console.log(cape);
  // }
}
