import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class CreateSurveyDTO {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  link: string;

  @Field({ nullable: true })
  manager: string | null;
}
