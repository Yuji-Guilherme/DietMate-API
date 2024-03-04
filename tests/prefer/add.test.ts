import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { testServer } from '../vitest.setup';
import { createUserTest, deleteUserTest, getCookieTest } from '../helpers';
//@ts-ignore
import { preferError } from '@/constants/errors';

const userTest = {
    username: 'TestUser20',
    password: 'test12345'
};

const preferTest = {
    water: 5,
    calories: 2,
    protein: 3,
    carb: 4,
    fat: 6,
    currentWeight: 8,
    targetWeight: 10
};

const invalidPrefer = {
    water: '5',
    calories: true
};

describe('/preference', () => {
    beforeAll(async () => {
        await createUserTest(userTest);
    });

    it('should not be possible to add without sending a preference', async () => {
        const cookies = await getCookieTest(userTest);
        const result = await testServer.post('/preference').set('Cookie', cookies);

        expect(result.error).toBeTruthy();
    });

    it('should not be possible to add empty preference', async () => {
        const cookies = await getCookieTest(userTest);
        const result = await testServer.post('/preference').set('Cookie', cookies).send({ preference: {} });

        expect(result.statusCode).toEqual(preferError.submitOne.status);
        expect(result.text).toMatch(preferError.submitOne.message);
    });

    it('should not be possible to add a preference sending invalid values', async () => {
        const cookies = await getCookieTest(userTest);
        const result = await testServer.post('/preference').set('Cookie', cookies).send({ preference: { ...invalidPrefer } });

        expect(result.statusCode).toEqual(preferError.invalid.status);
        expect(result.text).toMatch(preferError.invalid.message);
    });

    it('should add a preference correctly',  async () => {
        const cookies = await getCookieTest(userTest);
        const result = await testServer.post('/preference').set('Cookie', cookies).send({ preference: preferTest });

        expect(result.statusCode).toEqual(201);
        expect(result.body).toHaveProperty('message', 'Preference created successfully');
        expect(result.body).toHaveProperty('preference', preferTest);
    });

    afterAll(async () => {
        await deleteUserTest(userTest);
    });
});
