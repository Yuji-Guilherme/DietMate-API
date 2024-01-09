import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createUserTest, deleteUserTest, testServer } from '../helpers';
// @ts-ignore
import { authError } from '@/constants/errors';

const userTest = {
    username: 'TestUser',
    password: 'test12345'
};

describe('/auth', () => {
    beforeAll(async () => {
        await createUserTest(userTest);
    });

    it('should not be possible to login more than once', async () => {
        const cookies = (await testServer.post('/auth').send(userTest)).header['set-cookie'];
        const secondLogin = await testServer.post('/auth').send(userTest).set('Cookie', cookies);

        expect(secondLogin.unauthorized).toBeTruthy();
        expect(secondLogin.text).toMatch(authError.userLogged.message);
    });

    it('should not login with an incorrect username', async () => {
        const result = await testServer.post('/auth').send({...userTest, username: 'IncorrectUser'});

        expect(result.error).toBeTruthy();
        expect(result.statusCode).toEqual(authError.incorrectUserOrPassword.status);
        expect(result.text).toMatch(authError.incorrectUserOrPassword.message);
    });

    it('should not login with an incorrect password', async () => {
        const result = await testServer.post('/auth').send({...userTest, password: 'IncorrectPass'});

        expect(result.error).toBeTruthy();
        expect(result.statusCode).toEqual(authError.incorrectUserOrPassword.status);
        expect(result.text).toMatch(authError.incorrectUserOrPassword.message);
    });

    it('should login correctly',  async () => {
        const result = await testServer.post('/auth').send(userTest);
        const cookies = result.header['set-cookie'];

        expect(result.statusCode).toEqual(200);
        expect(result.body).toHaveProperty('message', 'User logged in successfully');
        expect(cookies).not.toBeNull();
        expect(cookies).not.toBeUndefined();
        expect(cookies[0]).toMatch('token');
        expect(cookies[1]).toMatch('refresh');
    });

    afterAll(async () => {
        await deleteUserTest(userTest);
    });
});
