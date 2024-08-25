import { Controller, Post } from '@nestjs/common';

@Controller()
export class ArticleController {
  constructor() {}

  @Post('api/article')
  async createArticle() {
    return {
      code: 0,
      msg: 'success',
      data: null,
    };
  }
}
