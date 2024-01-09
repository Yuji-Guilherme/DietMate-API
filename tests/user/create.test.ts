import { afterAll, describe, expect, it } from 'vitest';
import { testServer } from '../vitest.setup';
import { deleteUserTest } from '../helpers';
// @ts-ignore
import { userError } from '@/constants/errors';

const userTest = {
    username: 'Test1',
    password: 'test12345'
};

describe('/user', () => {
    it('should return an error if it does not have a username', async () => {
        const result = await testServer.post('/user').send({password: userTest.password});

        expect(result.statusCode).toEqual(userError.submitAllFields.status);
        expect(result.text).toMatch(userError.submitAllFields.message);
    });

    it('should return an error if it does not have a password', async () => {
        const result = await testServer.post('/user').send({username: userTest.username});

        expect(result.statusCode).toEqual(userError.submitAllFields.status);
        expect(result.text).toMatch(userError.submitAllFields.message);
    });

    it('should create a user correctly', async () => {
        const result = await testServer.post('/user').send(userTest);

        expect(result.statusCode).toEqual(201);
        expect(result.body).toHaveProperty('message', 'User created successfully');
        expect(result.body).toHaveProperty('user');
        expect(result.body.user).toHaveProperty('username', userTest.username);
        expect(result.body.user).toHaveProperty('id');
    });

    afterAll(async () => {
        await deleteUserTest(userTest);
    });
});
