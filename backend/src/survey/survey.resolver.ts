import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';

import { GQLAuthGuard } from '../guards/GQLAuthGuard';
import { UserEntity } from '../user/user.entity';
import { CreateSurveyDTO } from './dto/create-survey.dto';
import { EditSurveyDTO } from './dto/edit-survey.dto';
import { InputCreateSurvey } from './input/create-survey.input';
import { InputEditSurvey } from './input/edit-survey.input';
import { InputGetSurveys } from './input/get-surveys.input';
import { SurveyEntity } from './survey.entity';
import { SurveyService } from './survey.service';

@Resolver(() => SurveyEntity)
@UseGuards(GQLAuthGuard)
export class SurveyResolver {
  constructor(private readonly surveyService: SurveyService) {}

  @Query(() => [CreateSurveyDTO])
  async getSurveys(
    @Context() ctx: { req: { user: UserEntity } },
    @Args('pagination') pagination: InputGetSurveys, // по-хорошему, надо бы cursor-based пагинацию
  ): Promise<CreateSurveyDTO[]> {
    const { user } = ctx.req;
    if (user.role.name === 'admin') {
      return await this.surveyService.getSurveys({
        limit: pagination.limit,
        offset: pagination.offset,
      });
    } else {
      return await this.surveyService.getSurveys({
        limit: pagination.limit,
        offset: pagination.offset,
        forUser: user.id,
      });
    }
  }

  @Query(() => CreateSurveyDTO, { nullable: true })
  async getSurveyById(
    @Context() ctx: { req: { user: UserEntity } },
    @Args('id') id: string,
  ) {
    const { user } = ctx.req;
    if (user.role.name === 'admin') {
      return await this.surveyService.getSurvey(id);
    } else {
      return await this.surveyService.getSurvey(id, user.id);
    }
  }

  @Mutation(() => CreateSurveyDTO)
  async createSurvey(
    @Args('input') input: InputCreateSurvey,
    @Context() ctx: { req: { user: UserEntity } },
  ) {
    const survey = new SurveyEntity();
    survey.link = input.link;
    survey.name = input.name;
    if (ctx.req.user.role.name === 'manager') {
      survey.manager = ctx.req.user.id;
    }

    return this.surveyService.createSurvey(survey);
  }

  @Mutation(() => EditSurveyDTO, { nullable: true })
  async editSurvey(
    @Args('input') input: InputEditSurvey,
    @Context() ctx: { req: { user: UserEntity } },
  ) {
    const { user } = ctx.req;
    const survey = await this.surveyService.getSurvey(input.id);

    if (!survey) {
      return null;
    }

    if (user.role.name === 'admin' || user.id === survey.manager) {
      survey.link = input.link;
      survey.name = input.name;

      // думаю, что есть более изящное решение
      // можно кинуть ошибку
      if (user.role.name === 'admin' && input.manager) {
        survey.manager = input.manager;
      }

      await this.surveyService.updateSurvey(survey);
      return survey;
    }

    throw new UnauthorizedException();
  }
}
