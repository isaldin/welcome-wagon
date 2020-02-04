import { map } from 'ramda';

import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { GQLAuthGuard } from '../guards/GQLAuthGuard';
import { RoleGuard } from '../guards/RoleGuard';
import { CreateUserDTO } from './dto/create-user.dto';
import { ShowUserDTO } from './dto/show-user.dto';
import { InputUser } from './input/user.input';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Resolver(() => UserEntity)
@UseGuards(new RoleGuard('admin'))
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [ShowUserDTO])
  async profiles(): Promise<ShowUserDTO[]> {
    const userEntities = await this.userService.getUsers();
    return map(
      entity => ({
        email: entity.email,
        role: entity.role?.name || 'oops',
        registeredAt: entity.createdAt,
      }),
      userEntities,
    );
  }

  @Mutation(() => CreateUserDTO)
  async createManager(@Args('input') input: InputUser) {
    if (input.password !== input.confirmPassword) {
      // TODO: move validation to entity
      throw new Error("Passwords don't matched");
    }
    const user = await new UserEntity();
    user.email = input.email;
    user.password = input.password;
    return this.userService.createManager(input);
  }
}
