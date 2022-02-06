import { Module } from '@nestjs/common';
import { AppController } from './adapters/controllers/app.controller';

@Module({
  controllers: [AppController],
})
export class AppModule {}
