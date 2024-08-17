import { IsEmail, IsNotEmpty } from 'class-validator';
import { UserLogin } from '@app/types/user/userLogin.type';

export class LoginUserDto implements UserLogin {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}
