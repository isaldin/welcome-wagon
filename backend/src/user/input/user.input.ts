import { Field, InputType } from 'type-graphql';

@InputType()
export class InputUser {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  confirmPassword: string;
}
