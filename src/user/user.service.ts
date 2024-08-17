import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from '@app/models/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from 'config';
import { IUserResponse } from '@app/types/user/userResponse.interface';
import { LoginUserDto } from './dto/loginUser.dto';
import { compare } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDTO: CreateUserDto): Promise<User> {
    const userByEmail = await this.userRepository.findOne({
      where: { email: createUserDTO.email },
    });
    const userByName = await this.userRepository.findOne({
      where: { username: createUserDTO.username },
    });

    if (userByEmail || userByName) {
      throw new HttpException(
        'Такой пользователь уже существует',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const newUser = new User();

    Object.assign(newUser, createUserDTO);

    return await this.userRepository.save(newUser);
  }

  async login(loginUserDto: LoginUserDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email: loginUserDto.email },
      select: ['bio', 'email', 'id', 'image', 'username', 'password'],
    });

    if (!user) {
      throw new HttpException(
        'Пользователь не найден или введенные данные невалидны',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isValidPassword = await compare(loginUserDto.password, user.password);

    if (!isValidPassword) {
      throw new HttpException('Неверный пароль', HttpStatus.UNAUTHORIZED);
    }

    delete user.password;

    return user;
  }

  findById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
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
