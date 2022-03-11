import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(
    ['/docs', '/docs-json'],
    basicAuth({
      challenge: true,
      users: {
        kladnitsky: 'rl4cqj7',
        denoTen: 'x2gp0rn',
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Minecraft server')
    .setDescription('Backend-service')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableCors();

  app.useStaticAssets(join(__dirname, '..', 'static'), {
    prefix: '/static/',
  });

  await app.listen(4000);
}
bootstrap();
