import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from '@app/models/user.entity';
import { IUserResponse } from '@app/types/user/userResponse.interface';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('user/createUser')
  async createUser(
    @Body('user') createUserDTO: CreateUserDto,
  ): Promise<IUserResponse> {
    const user = await this.userService.createUser(createUserDTO);

    return this.userService.buildUserResponse(user);
  }
}
