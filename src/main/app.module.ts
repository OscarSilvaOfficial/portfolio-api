import { Module } from '@nestjs/common';
import { AppController } from '@/adapters/controllers/app.controller';
import { AxiosAdapter } from '@/infra/external/axios.adapter';
import { LoggerAdapter } from '@/adapters/logger/logger.adapter';

@Module({
  controllers: [AppController],
  providers: [AxiosAdapter, LoggerAdapter],
})
export class AppModule {}
