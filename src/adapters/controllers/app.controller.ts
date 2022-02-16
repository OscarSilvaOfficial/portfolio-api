import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { IProfile } from '@/core/domain/interfaces/profile.interface';
import { LinkedinPort } from '@/ports/linkedin.port';
import { NoSQLPort } from '@/ports/nosql.port';
import { ProfileSchema } from '@/infra/schemas/profile.schema';
import { ApiTags } from '@nestjs/swagger';
import { linkedinProfileService } from '@/core/useCases/linkedinProfile.service';
import { LinkedinRepositoryPort } from '@/ports/linkedin.repository.port';
import { LinkedinRepository } from '../repository/linkedin.repository';
import { MongoAdapter } from '@/infra/database/mongo.adapter';
import { NestLoggerAdapter } from '@/infra/logger/nest.logger';
import { AxiosAdapter } from '@/infra/external/axios.adapter';
import { LinkedinAdapter } from '@/infra/external/likedin.adapter'

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
    this.db = new MongoAdapter(
      process.env.MONGO_URL,
      'portfolio',
      'profiles',
      ProfileSchema,
      logger,
    );
    this.linkedinAdapter = new LinkedinAdapter(this.requestAdapter);
    this.repository = new LinkedinRepository(this.db);
    this.useCase = new linkedinProfileService(
      this.repository,
      this.linkedinAdapter,
      logger,
    );
  }

  @Get()
  async getLikedinProfile(@Req() request: Request): Promise<IProfile> {
    this.logger.debug(request, 'getLikedinProfile');
    return await this.useCase.getLikedinProfile();
  }
}
