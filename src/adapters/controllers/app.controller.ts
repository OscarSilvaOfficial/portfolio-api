import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { IProfile } from 'src/core/domain/interfaces/profile.interface';
import { LinkedinPort } from 'src/ports/linkedin.port';
import { RequestPort } from 'src/ports/request.port';
import { LinkedinAdapter } from '../external/likedin.adapter';
import { AxiosAdapter } from '../external/axios.adapter';
import { Logger } from '../logger/nest.adapter';
import { LoggerPort } from '../../ports/logger.port';

@Controller()
export class AppController {
  requestAdapter: RequestPort;
  linkedinAdapter: LinkedinPort;
  logger: LoggerPort;

  constructor() {
    this.logger = new Logger();
    this.requestAdapter = new AxiosAdapter();
    this.linkedinAdapter = new LinkedinAdapter(this.requestAdapter);
  }

  @Get()
  async getLikedinProfile(@Req() request: Request): Promise<IProfile> {
    this.logger.debug(request, 'getLikedinProfile');
    return await this.linkedinAdapter.getLikedinProfile(false);
  }
}
