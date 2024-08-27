import { AuthGuard } from '@app/user/guards/auth.guard';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { Articles } from '@app/models/article.entity';
import { User } from '@app/models/user.entity';
import { Follows } from '@app/models/follow.entity';

@Module({
  controllers: [ArticleController],
  providers: [AuthGuard, ArticleService],
  imports: [TypeOrmModule.forFeature([Articles, User, Follows])],
})
export class ArticleModule {}
