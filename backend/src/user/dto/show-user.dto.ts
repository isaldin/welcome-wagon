import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class ShowUserDTO {
  @Field()
  email: string;

  @Field()
  role: string;

  @Field()
  registeredAt: Date;
}
