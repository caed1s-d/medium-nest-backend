import { Request } from 'express';
import { User } from '@app/models/user.entity';

export interface IExpressRequest extends Request {
  user?: User;
}
