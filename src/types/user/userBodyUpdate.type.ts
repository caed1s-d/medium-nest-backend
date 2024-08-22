import { User } from '@app/models/user.entity';

export type UserBodyUpdate = Pick<User, 'bio' | 'username' | 'email' | 'image'>;
