import { Follows } from '@app/models/follow.entity';
import { User } from '@app/models/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';


@Module({
  imports: [TypeOrmModule.forFeature([User, Follows])],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
