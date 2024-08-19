import { User } from '@app/models/user.entity';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserDecorator = createParamDecorator(
  <T extends keyof User>(
    data: T,
    ctx: ExecutionContext,
  ): T extends undefined ? User : User[T] => {
    const request = ctx.switchToHttp().getRequest();

    if (!request.user) return null;

    if (data) return request.user[data];

    return request.user;
  },
);
