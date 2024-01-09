import { beforeAll, describe, expect, it } from 'vitest';
import { testServer } from '../vitest.setup';
import { createUserTest, getCookieTest } from '../helpers';

const userTest = {
    username: 'Test2',
    password: 'test12345'
};

describe('/user', () => {
    beforeAll(async () => {
        await createUserTest(userTest);
    });

    it('should not be possible to delete a user without a cookie', async () => {
        const result = await testServer.delete('/user');

        expect(result.unauthorized).toBeTruthy();
    });

    it('should delete a user correctly',  async () => {
        const cookies = await getCookieTest(userTest);
        const result = await testServer.delete('/user').set('Cookie', cookies);

        expect(result.statusCode).toEqual(200);
        expect(result.body).toHaveProperty('message', 'User successfully deleted');
    });
});
