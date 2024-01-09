import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createUserTest, deleteUserTest, getCookieTest, testServer } from '../helpers';

const userTest = {
    username: 'TestUser',
    password: 'test12345'
};

describe('/auth/logout', () => {
    beforeAll(async () => {
        await createUserTest(userTest);
    });

    it('should not be possible to logout without cookie', async () => {
        const result = await testServer.post('/auth/logout');

        expect(result.unauthorized).toBeTruthy();
    });

    it('should not be possible to logout with invalid refresh token', async () => {
        const invalidCookie = ['token=invalid', 'refresh=invalid'];
        const result = await testServer.post('/auth/logout').set('Cookie', invalidCookie);

        expect(result.unauthorized).toBeTruthy();
    });

    it('should logout correctly',  async () => {
        const cookies = await getCookieTest(userTest);
        const result = await testServer.post('/auth/logout').set('Cookie', cookies);
        const onlyTokenLogoutCookies = result.header['set-cookie'][0].split(';')[0].replace('token=', '');
        const onlyRefreshLogoutToken = result.header['set-cookie'][1].split(';')[0].replace('refresh=', '');

        expect(result.statusCode).toEqual(200);
        expect(result.body).toHaveProperty('message', 'Logout Success');
        expect(onlyTokenLogoutCookies).toEqual('');
        expect(onlyRefreshLogoutToken).toEqual('');
    });

    afterAll(async () => {
        await deleteUserTest(userTest);
    });
});
