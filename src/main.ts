import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

function configSwegger(app: any) {
  const config = new DocumentBuilder()
    .setTitle('Portfolio API Swegger')
    .setDescription('Api para consulta das informações do perfil do Linkedin')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
}

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  configSwegger(app);
  app.enableCors();
  await app.listen(process.env.PORT || 8000);
}
bootstrap();
