import request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/main/app.module';
import { INestApplication } from '@nestjs/common'
import * as dotenv from 'dotenv';


describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    dotenv.config();
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
  });
});
