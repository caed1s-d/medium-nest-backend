import { User } from '@app/models/user.entity';

export type ProfileType = Omit<User, 'hashPassword'> & { following: boolean };
