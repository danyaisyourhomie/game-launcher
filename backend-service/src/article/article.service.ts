/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateArticleRequest } from 'src/common/requests/create.article.dto';
import { Article } from 'src/entities/article.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async getArticles() {
    return await this.articleRepository.find();
  }

  async getLatestArticle() {
    return await this.articleRepository.findOne({
      order: { id: 'DESC' },
    });
  }

  async getNews() {
    const news = await this.articleRepository.find({
      order: { id: 'DESC' },
    });

    return news.filter((elem, index) => index !== 0);
  }

  async updateArticle(data: Partial<CreateArticleRequest>) {
    return await this.articleRepository.save({ ...data });
  }

  async createArticle(data) {
    return await this.articleRepository.save(data);
  }
}
