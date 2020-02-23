import { IsNotEmpty, IsUrl } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class InputCreateSurvey {
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
