import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { IProfile } from 'src/core/domain/interfaces/profile.interface';
import { LinkedinPort } from 'src/ports/linkedin.port';
import { LinkedinAdapter } from '../../infra/external/likedin.adapter';
import { AxiosAdapter } from '../../infra/external/axios.adapter';
import { NoSQLPort } from 'src/ports/nosql.port';
import { MongoDB } from '../../infra/database/mongo.adapter';
import { ProfileSchema } from '../../infra/schemas/profile.schema';
import { ApiTags } from '@nestjs/swagger';
import { NestLoggerAdapter } from 'src/infra/logger/nest.logger';
import { linkedinProfileService } from 'src/core/useCases/linkedinProfile.service';
import { LinkedinRepositoryPort } from 'src/ports/linkedin.repository.port';
import { LinkedinRepository } from '../repository/linkedin.repository';

@ApiTags('Likedin Profile API')
@Controller()
export class AppController {
  db: NoSQLPort;
  linkedinAdapter: LinkedinPort;
  repository: LinkedinRepositoryPort;
  useCase: linkedinProfileService;

  constructor(
    readonly requestAdapter: AxiosAdapter,
    readonly logger: NestLoggerAdapter,
  ) {
    this.linkedinAdapter = new LinkedinAdapter(this.requestAdapter);
    this.db = new MongoDB(
      process.env.MONGO_URL,
      'portfolio',
      'profiles',
      ProfileSchema,
      logger,
    );
    this.repository = new LinkedinRepository(this.db);
    this.useCase = new linkedinProfileService(
      this.repository,
      this.linkedinAdapter,
    );
  }

  @Get()
  async getLikedinProfile(@Req() request: Request): Promise<IProfile> {
    this.logger.debug(request, 'getLikedinProfile');
    return await this.useCase.getLikedinProfile();
  }
}
