import { Request, Response } from 'express';
import { replace } from 'ramda';

import { Injectable, NestMiddleware } from '@nestjs/common';

import { JwtService } from '../jwt/jwt.service';
import { UserEntity } from '../user/user.entity';

interface AppRequest extends Request {
  user: UserEntity;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: AppRequest, res: Response, next: Function) {
    const token = replace('Bearer ', '', req.headers.authorization || '');
    if (token) {
      const user = await this.jwtService.getUserWithJwt(token);
      req.user = user;
    }
    next();
  }
}
