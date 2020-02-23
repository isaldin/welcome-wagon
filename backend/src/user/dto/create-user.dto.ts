import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class CreateUserDTO {
  @Field()
  email: string;

  @Field()
  password: string;
}
