import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateUserDTO } from './dto/create-user.dto';
import { InputUser } from './input/user.input';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [CreateUserDTO])
  async users() {
    return this.userService.getUsers();
  }

  @Mutation(() => CreateUserDTO)
  async createUser(@Args('input') input: InputUser) {
    if (input.password !== input.confirmPassword) {
      throw new Error("Passwords don't matched");
    }
    return this.userService.createUser(input);
  }
}
