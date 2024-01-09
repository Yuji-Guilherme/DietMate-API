import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { testServer } from '../vitest.setup';
import { createUserTest, deleteUserTest, getCookieTest } from '../helpers';
// @ts-ignore
import { userError } from '@/constants/errors';

const userTest = {
    username: 'Test4',
    password: 'test12345'
};

const userUpdatedTest = {
    username: 'TestUpdate',
    password: 'passUpdate'
};

const userUpdatedTest2 = {
    username: 'TestUpdate2',
    password: 'passUpdated2'
};

describe('/user', () => {
    beforeAll(async () => {
        await createUserTest(userTest);
    });

    it('should not be possible to update a user without a cookie', async () => {
        const result = await testServer.patch('/user');

        expect(result.unauthorized).toBeTruthy();
    });

    it('should not be possible to update a user without username or password', async () => {
        const cookies = await getCookieTest(userTest);
        const result = await testServer.patch('/user').set('Cookie', cookies);

        expect(result.statusCode).toEqual(userError.submitOneFieldToUpdate.status);
        expect(result.text).toMatch(userError.submitOneFieldToUpdate.message);
    });

    it('should change the user username',  async () => {
        const cookies = await getCookieTest(userTest);
        const result = await testServer.patch('/user').send({ username: userUpdatedTest.username }).set('Cookie', cookies);

        expect(result.statusCode).toEqual(200);
        expect(result.body).toHaveProperty('message', 'User successfully updated');
    });

    it('should change the user password', async () => {
        const cookies = await getCookieTest({ ...userTest, username: userUpdatedTest.username });
        const result = await testServer.patch('/user').send({ password: userUpdatedTest.password }).set('Cookie', cookies);

        expect(result.statusCode).toEqual(200);
        expect(result.body).toHaveProperty('message', 'User successfully updated');
    });

    it('should change the username and password',  async () => {
        const cookies = await getCookieTest(userUpdatedTest);
        const result = await testServer.patch('/user').send(userUpdatedTest2).set('Cookie', cookies);

        expect(result.statusCode).toEqual(200);
        expect(result.body).toHaveProperty('message', 'User successfully updated');
    });

    afterAll(async () => {
        await deleteUserTest(userUpdatedTest2);
    });
});
