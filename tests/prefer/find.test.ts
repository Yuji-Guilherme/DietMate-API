import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { testServer } from '../vitest.setup';
import { createUserTest, deleteUserTest, getCookieTest } from '../helpers';

const userTest = {
    username: 'TestUser22',
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

describe('/preference', () => {
    beforeAll(async () => {
        await createUserTest(userTest);
    });

    it('should not be possible to find the preference without the user having a preference', async () => {
        const cookies = await getCookieTest(userTest);
        const result = await testServer.get('/preference').set('Cookie', cookies);

        expect(result.statusCode).toEqual(204);
    });

    it('should find user preference correctly',  async () => {
        const cookies = await getCookieTest(userTest);

        await testServer.post('/preference').set('Cookie', cookies).send({ preference: preferTest });
        const result = await testServer.get('/preference').set('Cookie', cookies);
        expect(result.statusCode).toEqual(200);
    
        expect(result.body).toHaveProperty('preference');
        expect(result.body.preference).toEqual(preferTest);
    });

    afterAll(async () => {
        await deleteUserTest(userTest);
    });
});
