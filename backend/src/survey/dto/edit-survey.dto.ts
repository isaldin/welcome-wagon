import { Field, ObjectType } from 'type-graphql';

import { CreateSurveyDTO } from './create-survey.dto';

@ObjectType()
export class EditSurveyDTO extends CreateSurveyDTO {}
