import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { IUserResponse } from '@app/types/user/userResponse.interface';
import { LoginUserDto } from './dto/loginUser.dto';
import { UserDecorator } from './decorators/user.decorator';
import { User } from '@app/models/user.entity';
import { AuthGuard } from './guards/auth.guard';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('api/users')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body('user') createUserDTO: CreateUserDto,
  ): Promise<IUserResponse> {
    const user = await this.userService.createUser(createUserDTO);

    return this.userService.buildUserResponse(user);
  }

  @Post('api/users/login')
  @UsePipes(new ValidationPipe())
  async login(@Body('user') loginData: LoginUserDto): Promise<IUserResponse> {
    const user = await this.userService.login(loginData);

    return this.userService.buildUserResponse(user);
  }

  @Get('api/user')
  @UseGuards(AuthGuard)
  async currentUser(@UserDecorator() user: User): Promise<IUserResponse> {
    return this.userService.buildUserResponse(user);
  }
}
