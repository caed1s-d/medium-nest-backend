import { Tags } from '@app/models/tag.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tags)
    private readonly tagRepository: Repository<Tags>,
  ) {}
  async findAll(): Promise<Tags[]> {
    return await this.tagRepository.find();
  }
}
