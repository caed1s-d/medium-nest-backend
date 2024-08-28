import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { User } from '@app/models/user.entity';
import { CreateArticleDto } from './dto/createArticle.dto';
import { UserDecorator } from '@app/user/decorators/user.decorator';
import { ArticleResponseInterface } from '@app/types/article/articleResponse.interface';
import { ArticlesResponseInterface } from '@app/types/article/articlesResponse.interface';
import { BackendValidationPipe } from '@app/shared/pipes/backendValidation.pipe';

@Controller()
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @Get('api/articles/:slug')
  async getSingleArticle(
    @Param('slug') slug: string,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.findBySlug(slug);
    return this.articleService.buildArticleResponse(article);
  }

  @Get('api/articles/feed')
  @UseGuards(AuthGuard)
  async getFeed(
    @UserDecorator('id') currentUserId: number,
    @Query() query: any,
  ): Promise<ArticlesResponseInterface> {
    return await this.articleService.getFeed(currentUserId, query);
  }

  @Delete('api/articles/:slug')
  @UseGuards(AuthGuard)
  async deleteArticle(
    @UserDecorator('id') currentUserId: number,
    @Param('slug') slug: string,
  ) {
    return await this.articleService.deleteArticle(slug, currentUserId);
  }

  @Put('api/articles/:slug')
  @UseGuards(AuthGuard)
  @UsePipes(new BackendValidationPipe())
  async updateArticle(
    @UserDecorator('id') currentUserId: number,
    @Param('slug') slug: string,
    @Body('article') updateArticleDto: CreateArticleDto,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.updateArticle(
      slug,
      updateArticleDto,
      currentUserId,
    );

    return this.articleService.buildArticleResponse(article);
  }

  @Get('api/articles')
  async getAll(
    @UserDecorator('id') currentUserId: number,
    @Query() query: any,
  ): Promise<ArticlesResponseInterface> {
    return await this.articleService.getAll(currentUserId, query);
  }

  @Post('api/articles')
  @UsePipes(new BackendValidationPipe())
  @UseGuards(AuthGuard)
  async createArticle(
    @UserDecorator() currentUser: User,
    @Body('article') createArticleDto: CreateArticleDto,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.createArticle(
      currentUser,
      createArticleDto,
    );
    return this.articleService.buildArticleResponse(article);
  }

  @Post('api/articles/:slug/favorite')
  @UseGuards(AuthGuard)
  async addArticleToFavorites(
    @UserDecorator('id') currentUserId: number,
    @Param('slug') slug: string,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.addArticleToFavorites(
      slug,
      currentUserId,
    );

    return this.articleService.buildArticleResponse(article);
  }

  @Delete('api/articles/:slug/favorite')
  @UseGuards(AuthGuard)
  async deleteArticleFromFavorites(
    @UserDecorator('id') currentUserId: number,
    @Param('slug') slug: string,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.deleteArticleFromFavorites(
      slug,
      currentUserId,
    );

    return this.articleService.buildArticleResponse(article);
  }
}
