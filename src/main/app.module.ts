import { Module } from '@nestjs/common';
import { AppController } from '@/adapters/controllers/app.controller';
import { AxiosAdapter } from '@/infra/external/axios.adapter';
import { NestLoggerAdapter } from '@/infra/logger/nest.logger';

@Module({
  controllers: [AppController],
  providers: [AxiosAdapter, NestLoggerAdapter],
})
export class AppModule {}
