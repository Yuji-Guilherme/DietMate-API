import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { testServer } from '../vitest.setup';
import { createUserTest, deleteUserTest, getCookieTest } from '../helpers';

const userTest = {
    username: 'Test3',
    password: 'test12345'
};

describe('/user', () => {
    beforeAll(async () => {
        await createUserTest(userTest);
    });

    it('should not be possible to find a user without a cookie', async () => {
        const result = await testServer.get('/user');

        expect(result.unauthorized).toBeTruthy();
    });

    it('should find a user correctly',  async () => {
        const cookies = await getCookieTest(userTest);
        const result = await testServer.get('/user').set('Cookie', cookies);

        expect(result.statusCode).toEqual(200);
        expect(result.body).toHaveProperty('user');
        expect(result.body.user).toHaveProperty('username', userTest.username.toLowerCase());
        expect(result.body.user).toHaveProperty('_id');
        expect(result.body.user).toHaveProperty('token');
    });

    afterAll(async () => {
        await deleteUserTest(userTest);
    });
});
