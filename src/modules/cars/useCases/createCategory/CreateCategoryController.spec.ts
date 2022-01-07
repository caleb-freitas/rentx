import request from 'supertest';
import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';
import { Connection } from 'typeorm';
import { hash } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

let connection: Connection;

describe('Create category controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
    const id = uuidv4();
    const password = await hash('admin', 8);
    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
      values('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'now()', 'AAA-0000')
      `
    );
  });
  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
  it('should be able to create a new category', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com',
      password: 'admin'
    });
    const { token } = responseToken.body;

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'category_supertest',
        description: 'category_description_supertest'
      })
      .set({
        Authorization: `Bearer ${token}`
      });
    expect(response.status).toBe(201);
  });
  it('should not be able to create a duplicated categories', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com',
      password: 'admin'
    });
    const { token } = responseToken.body;

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'category_supertest',
        description: 'category_description_supertest'
      })
      .set({
        Authorization: `Bearer ${token}`
      });
    expect(response.status).toBe(400);
  });
});
