import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { IUserResponse } from '@app/types/user/userResponse.interface';
import { LoginUserDto } from './dto/loginUser.dto';
import { IExpressRequest } from '@app/types/expressRequest.interface';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('api/users')
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
  async currentUser(@Req() request: IExpressRequest): Promise<IUserResponse> {
    return this.userService.buildUserResponse(request.user);
  }
}
