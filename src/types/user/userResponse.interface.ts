import { User } from '@app/models/user.entity';

export interface IUserResponse {
  user: Omit<User, 'hashPassword'> & { token: string };
}
