import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { UserEntity } from '../user/user.entity';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly role: 'admin' | 'manager') {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext<{ req: { user: UserEntity } }>().req.user;

    // assume that admin is god
    return user && (user.role.name === 'admin' || user.role.name === this.role);
  }
}
