import { Module } from '@nestjs/common';
import { ITagModule } from 'src/types/tag/tagModule';
import { TagController } from '@app/tag/tag.controller';
import { TagService } from '@app/tag/tag.service';
import { Tags } from '@app/models/tag.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [TagController],
  providers: [TagService],
  imports: [TypeOrmModule.forFeature([Tags])],
})
export class TagModule implements ITagModule {}
