import supertest from 'supertest';
import app from '../src/app';

const testServer = supertest(app);

export { testServer };
