import supertest from 'supertest';
//@ts-ignore
import app from '@/app';

const testServer = supertest(app);

export { testServer };
