import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { IProfile } from 'src/core/domain/interfaces/profile.interface';
import { LinkedinPort } from 'src/ports/linkedin.port';
import { RequestPort } from 'src/ports/request.port';
import { LinkedinAdapter } from '../infra/external/likedin.adapter';
import { AxiosAdapter } from '../infra/external/axios.adapter';
import { Logger } from '../infra/logger/nest.adapter';
import { LoggerPort } from '../../ports/logger.port';
import { NoSQLPort } from 'src/ports/nosql.port';
import { MongoDB } from '../infra/database/mongo.adapter';
import { ProfileSchema } from '../infra/schemas/profile.schema';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Likedin Profile API')
@Controller()
export class AppController {
  requestAdapter: RequestPort;
  linkedinAdapter: LinkedinPort;
  logger: LoggerPort;
  db: NoSQLPort;

  constructor() {
    this.logger = new Logger();
    this.requestAdapter = new AxiosAdapter();
    this.linkedinAdapter = new LinkedinAdapter(this.requestAdapter);
    this.db = new MongoDB(
      process.env.MONGO_URL,
      'portfolio',
      'profile',
      ProfileSchema,
    );
  }

  @Get()
  async getLikedinProfile(@Req() request: Request): Promise<IProfile> {
    this.logger.debug(request, 'getLikedinProfile');
    return await this.linkedinAdapter.getLikedinProfile(false);
  }

  @Get('/index')
  async index() {
    return { Message: 'Hello World' };
  }
}
