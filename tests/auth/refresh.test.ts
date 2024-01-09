import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createUserTest, deleteUserTest, getCookieTest, testServer } from '../helpers';

const userTest = {
    username: 'TestUser7',
    password: 'test12345'
};

describe('/auth/refresh', () => {
    beforeAll(async () => {
        await createUserTest(userTest);
    });

    it('should not be possible to generate refresh token without cookie', async () => {
        const result = await testServer.post('/auth/refresh');

        expect(result.unauthorized).toBeTruthy();
    });

    it('should not be possible to generate refresh with invalid token', async () => {
        const invalidCookie = ['token=invalid', 'refresh=invalid'];
        const result = await testServer.post('/auth/refresh').set('Cookie', invalidCookie);

        expect(result.unauthorized).toBeTruthy();
    });

    it('should generate refresh token correctly',  async () => {
        const cookies = await getCookieTest(userTest);
        const result = await testServer.post('/auth/refresh').set('Cookie', cookies);

        expect(result.statusCode).toEqual(200);
        expect(result.body).toHaveProperty('message', 'Refresh token generated Successfully');
    });

    afterAll(async () => {
        await deleteUserTest(userTest);
    });
});
