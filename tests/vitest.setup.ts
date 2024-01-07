import supertest from 'supertest';
import app from '../src/app';
import { User } from '../src/types';

const testServer = supertest(app);

const createUserTest = async (user: User) => {
    await testServer.post('/user').send(user);
};

const getCookieTest = async (user: User) => (await testServer.post('/auth').send(user)).header['set-cookie'];

const deleteUserTest = async (user: User) => {
    const cookies = await getCookieTest(user);
    await testServer.delete('/user').set('Cookie', cookies);
};


export { testServer, createUserTest, getCookieTest, deleteUserTest };
