import { CreateUserDto } from '@app/user/dto/createUser.dto';

export type UserLogin = Pick<CreateUserDto, 'password' | 'email'>;
