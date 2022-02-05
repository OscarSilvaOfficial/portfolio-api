import { Module } from '@nestjs/common';
import { AppController } from './adapters/controllers/app.controller';
import { LinkedinAdapter } from './adapters/external/likedin.adapter';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [LinkedinAdapter],
})
export class AppModule {}
