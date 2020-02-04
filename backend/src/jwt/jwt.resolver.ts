import { Args, Query, Resolver } from '@nestjs/graphql';

import { LoginDTO } from './dto/login.dto';
import { InputCredentials } from './input/credentials.input';
import { JwtEntity } from './jwt.entity';
import { JwtService } from './jwt.service';

class Token {
  token: string;
}

@Resolver(() => JwtEntity)
export class JwtResolver {
  constructor(private readonly jwtService: JwtService) {}

  @Query(() => String, { nullable: true })
  async login(
    @Args('credentials') credentials: InputCredentials,
  ): Promise<string | null> {
    const token = await this.jwtService.getTokenForUserWithCredentials(
      credentials,
    );

    return token;
  }
}
