import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateArticleRequest } from 'src/common/requests/create.article.dto';
import { Article } from 'src/entities/article.dto';
import { ArticleService } from './article.service';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @Get()
  async getArticles() {
    return await this.articleService.getArticles();
  }

  @Get('latest')
  async getLatestArticle() {
    return await this.articleService.getLatestArticle();
  }

  @Get('news')
  async getNews() {
    return await this.articleService.getNews();
  }

  @Post('create')
  async createArticle(@Body() data: CreateArticleRequest) {
    if (!data.description || !data.title) {
      throw new BadRequestException({ msg: 'Заполните все поля' });
    }

    return await this.articleService.createArticle(data);
  }

  @Patch('update/:id')
  async updateeArticle(@Body() data: CreateArticleRequest) {
    if (!data.description || !data.title) {
      throw new BadRequestException({ msg: 'Заполните все поля' });
    }

    return await this.articleService.updateArticle(data);
  }
}
