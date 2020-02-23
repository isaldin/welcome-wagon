import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '../user/user.entity';
import { JwtEntity } from './jwt.entity';
import { JwtResolver } from './jwt.resolver';
import { JwtService } from './jwt.service';

@Module({
  imports: [TypeOrmModule.forFeature([JwtEntity, UserEntity])],
  providers: [JwtResolver, JwtService],
  exports: [JwtService],
})
export class JwtModule {
  //
}
