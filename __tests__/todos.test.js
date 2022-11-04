const { app } = require('../lib/server.js');
const { auth_db, users } = require('../lib/auth/models');
const { api_db } = require('../lib/models');
// const jwt = require('jsonwebtoken');
const supertest = require('supertest');
// this just makes http requests.
const request = supertest(app);

let token = null;

beforeAll(async () => {
  await auth_db.sync();
  await api_db.sync();
  let user = await users.create({
    username: 'adminUser',
    password: 'test',
    role: 'admin'
  });
  token = user.token;
});
afterAll(async () => {
  await auth_db.drop();
  await api_db.drop();
});

describe("Test api/v1 routes",() => {
  beforeEach(async () => {
    await api_db.sync();
  })
  afterEach(async () => {
    await api_db.drop();
  })

  test('Should get all', async () => {
    //let response = await request.get('/api/v1/todos').set('Authorization', `Bearer ${token}`);
    const response = await request.get('/api/v1/todos')

    expect(response.status).toEqual(200);
    expect(response.body).toEqual([]);
  });

  test('should create on post', async () => {
    const response = await request.post('/api/v1/todos').send({ text: 'sample', difficulty: 1, assignee: 'John', complete: false });

    expect(response.status).toEqual(201);
    expect(response.body).toEqual(expect.objectContaining({text: 'sample'}));
  });
});

describe("testing our api routes",() => {
  beforeEach(async () => {
    await api_db.sync();
  })
  afterEach(async () => {
    await api_db.drop();
  })

  test('Should return empty on get all', async () => {
    let response = await request.get('/api/v2/todos').set('Authorization', `Bearer ${token}`);

    expect(response.status).toEqual(200);
    expect(response.body).toEqual([]);
  });

  test('should create on post', async () => {
    const response = await request.post('/api/v2/todos').set('Authorization', `Bearer ${token}`)
      .send({ text: 'sample', difficulty: 1, assignee: 'John', complete: false });

    expect(response.status).toEqual(201);
    expect(response.body).toEqual(expect.objectContaining({text: 'sample'}));
  });
});
