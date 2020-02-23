import { map } from 'ramda';

import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';

import { GQLAuthGuard } from '../guards/GQLAuthGuard';
import { RoleGuard } from '../guards/RoleGuard';
import { CreateUserDTO } from './dto/create-user.dto';
import { ShowUserDTO } from './dto/show-user.dto';
import { InputUser } from './input/user.input';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => ShowUserDTO)
  @UseGuards(GQLAuthGuard)
  async me(@Context() ctx: { req: { user: UserEntity } }) {
    const user = await this.userService.getUser(ctx.req.user.id);
    return {
      id: user.id,
      email: user.email,
      role: user.role.name,
      registeredAt: user.createdAt,
    };
  }

  @Query(() => [ShowUserDTO])
  @UseGuards(new RoleGuard('admin'))
  async profiles(): Promise<ShowUserDTO[]> {
    const userEntities = await this.userService.getUsers();
    return map(
      entity => ({
        id: entity.id,
        email: entity.email,
        role: entity.role?.name || 'oops',
        registeredAt: entity.createdAt,
      }),
      userEntities,
    );
  }

  @Mutation(() => CreateUserDTO)
  @UseGuards(new RoleGuard('admin'))
  async createManager(@Args('input') input: InputUser) {
    if (input.password !== input.confirmPassword) {
      // TODO: move validation to entity
      throw new Error("Passwords don't matched");
    }
    const user = new UserEntity();
    user.email = input.email;
    user.password = input.password;
    return this.userService.createManager(input);
  }
}
