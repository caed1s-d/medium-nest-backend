import { AuthGuard } from '@app/user/guards/auth.guard';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleController } from './article.controller';

@Module({
  controllers: [ArticleController],
  providers: [AuthGuard],
  imports: [TypeOrmModule.forFeature([])],
  exports: [],
})
export class ArticleModule {}
