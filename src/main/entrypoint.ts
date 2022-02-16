import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';


export class Entrypoint {

  constructor(readonly documentBuilder: DocumentBuilder) {}

  async documentBuilderFactory() {
    return await this.documentBuilder
      .setTitle('Portfolio API Swegger')
      .setDescription('Api para consulta das informações do perfil do Linkedin')
      .setVersion('1.0')
      .build();
  }

  async configSwegger(app: any) {
    const config = await this.documentBuilderFactory();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }
  
  static async bootstrap() {
    dotenv.config();
    const app = await NestFactory.create(AppModule);
    const self = new Entrypoint(new DocumentBuilder()); 
    self.configSwegger(app);
    app.enableCors();
    await app.listen(process.env.PORT || 8000);
  }
}