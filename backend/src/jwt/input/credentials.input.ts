import { Field, InputType } from 'type-graphql';

@InputType()
export class InputCredentials {
  @Field()
  email: string;

  @Field()
  password: string;
}
