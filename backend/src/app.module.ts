import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import typeormConfig from './config/typeorm.config';
import { JwtModule } from './jwt/jwt.module';
import { AuthMiddleware } from './middlewares/AuthMiddleware';
import { SurveyrModule } from './survey/survey.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig.getTypeOrmConfig()),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gpl',
      context: ({ req }) => ({ req }),
    }),
    UserModule,
    JwtModule,
    SurveyrModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'graphql', method: RequestMethod.POST });
  }
}
