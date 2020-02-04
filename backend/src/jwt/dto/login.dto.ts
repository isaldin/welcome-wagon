import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class LoginDTO {
  @Field()
  email: string;

  @Field()
  password: string;
}
