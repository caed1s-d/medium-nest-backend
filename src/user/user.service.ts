import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from '@app/models/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from 'config';
import { IUserResponse } from '@app/types/user/userResponse.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDTO: CreateUserDto): Promise<User> {
    const newUser = new User();

    Object.assign(newUser, createUserDTO);

    return await this.userRepository.save(newUser);
  }

  buildUserResponse(user: User): IUserResponse {
    return {
      user: {
        ...user,
        token: this.generateJWT(user),
      },
    };
  }

  private generateJWT(user: User): string {
    return sign(
      { id: user.id, email: user.email, username: user.username },
      JWT_SECRET,
    );
  }
}
