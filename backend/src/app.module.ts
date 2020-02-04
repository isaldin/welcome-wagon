import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import typeormConfig from './config/typeorm.config';
import { JwtModule } from './jwt/jwt.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig.getTypeOrmConfig()),
    GraphQLModule.forRoot({ autoSchemaFile: 'schema.gpl' }),
    UserModule,
    JwtModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
