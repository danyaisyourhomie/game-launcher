import { ArticleModule } from './article/article.module';
import { ArticleController } from './article/article.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.dto';
import { User } from './entities/user.dto';
import { AuthSession } from './entities/auth_session.dto';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ArticleModule,
    UserModule,
    AuthModule,
    ArticleModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Article, User, AuthSession],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
