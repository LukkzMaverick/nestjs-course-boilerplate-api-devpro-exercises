import { User } from './../src/users/entities/user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateUserDto } from './../src/users/dto/create-user.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const user: CreateUserDto = {
    username: 'Lucas',
    password: '123456',
    firstName: 'Lucas',
    lastName: 'Cunha',
    email: 'lucas@gmail.com',
  };

  const userWithoutPassword: Partial<User> = {
    username: 'Lucas',
    firstName: 'Lucas',
    lastName: 'Cunha',
    email: 'lucas@gmail.com',
  };
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET /Users', async () => {
    await request(app.getHttpServer()).post('/users').send(user).expect(201);

    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .then((response) => {
        expect(response.body[0]).toMatchObject(userWithoutPassword);
      });
  });

  it('GET /Users/:id', async () => {
    const result = await request(app.getHttpServer())
      .post('/users')
      .send(user)
      .expect(201);

    return request(app.getHttpServer())
      .get(`/users/${result.body.id}`)
      .expect(200)
      .then((response) => {
        expect(response.body.id).toBe(result.body.id);
      });
  });

  it('POST /Users', async () => {
    const result = await request(app.getHttpServer())
      .post('/users')
      .send(user)
      .expect(201);

    expect(result.body).toMatchObject(userWithoutPassword);
  });

  it('PATCH /Users/:id', async () => {
    const resultPost = await request(app.getHttpServer())
      .post('/users')
      .send(user)
      .expect(201);
    const firstName = 'Luis';
    const resultPatch = await request(app.getHttpServer())
      .patch(`/users/${resultPost.body.id}`)
      .send({ ...user, firstName })
      .expect(200);

    expect(resultPatch.body).toMatchObject({
      ...userWithoutPassword,
      firstName,
    });
  });

  it('DELETE /Users/:id', async () => {
    const resultPost = await request(app.getHttpServer())
      .post('/users')
      .send(user)
      .expect(201);
    const resultPatch = await request(app.getHttpServer())
      .delete(`/users/${resultPost.body.id}`)
      .expect(204);
  });
});
