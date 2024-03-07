import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { testServer } from '../vitest.setup';
import { createUserTest, deleteUserTest, getCookieTest } from '../helpers';

const userTest = {
    username: 'TestUser23',
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

    it('should not be possible to delete preference without the user having a preference', async () => {
        const cookies = await getCookieTest(userTest);
        const result = await testServer.delete('/preference').set('Cookie', cookies);

        expect(result.statusCode).toEqual(204);
    });

    it('should delete user preference correctly',  async () => {
        const cookies = await getCookieTest(userTest);

        await testServer.post('/preference').set('Cookie', cookies).send({ preference: preferTest });

        const result = await testServer.delete('/preference').set('Cookie', cookies);
        const userPreferenceResult = await testServer.get('/preference').set('Cookie', cookies);

        expect(result.statusCode).toEqual(200);
        expect(result.body).toHaveProperty('message', 'Preference successfully deleted');
        expect(userPreferenceResult.statusCode).toEqual(204);
    });

    afterAll(async () => {
        await deleteUserTest(userTest);
    });
});
