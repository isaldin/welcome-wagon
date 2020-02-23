import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class ShowUserDTO {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  role: string;

  @Field()
  registeredAt: Date;
}
