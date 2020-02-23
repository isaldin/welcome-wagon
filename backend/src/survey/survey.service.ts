import { Equal, IsNull, Not, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateSurveyDTO } from './dto/create-survey.dto';
import { SurveyEntity } from './survey.entity';

interface GetSurveysParams {
  forUser?: string;
  limit: number;
  offset: number;
}

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(SurveyEntity)
    private readonly surveyRepository: Repository<SurveyEntity>,
  ) {
    //
  }

  async createSurvey(input: CreateSurveyDTO): Promise<SurveyEntity> {
    const survey = new SurveyEntity();
    survey.name = input.name;
    survey.link = input.link;
    survey.manager = input.manager;
    await this.surveyRepository.save(survey);

    return survey;
  }

  async getSurvey(id: string, owner?: string) {
    try {
      if (owner) {
        return await this.surveyRepository.findOne({ id, manager: owner });
      }
      return await this.surveyRepository.findOne({ id });
    } catch (error) {
      return null;
    }
  }

  async getSurveys({ forUser, limit, offset }: GetSurveysParams) {
    let findParams = { skip: offset, take: limit };
    if (forUser) {
      findParams['where'] = { manager: Equal(forUser) }; // so ugly
    }

    const results = await this.surveyRepository.find(findParams);

    return results;
  }

  async updateSurvey(input: SurveyEntity): Promise<SurveyEntity> {
    const survey = await this.surveyRepository.findOne({ id: input.id });

    await this.surveyRepository.save(survey);

    return survey;
  }
}
