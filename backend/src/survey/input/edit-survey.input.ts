import { IsNotEmpty, IsUrl } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class InputEditSurvey {
  @Field()
  @IsNotEmpty()
  id: string;

  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsUrl()
  link: string;

  @Field({ nullable: true })
  manager: string | null;
}
