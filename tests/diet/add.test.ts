import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { testServer } from '../vitest.setup';
import { createUserTest, deleteUserTest, getCookieTest } from '../helpers';
//@ts-ignore
import { dietError } from '@/constants/errors';

const userTest = {
    username: 'TestUser8',
    password: 'test12345'
};

const dietTest = {
    title: 'diet test',
    content: [{
        _id: '1',
        number: 1,
        description: 'food test',
        grams: 1,
        calories: 1,
        carbs: 1,
        fat: 1,
        protein: 1,
        fiber: 1
    }]
};

const invalidFood = {
    _id: '1',
    grams: 1,
    fiber: 1
};

describe('/diet', () => {
    beforeAll(async () => {
        await createUserTest(userTest);
    });

    it('should not be possible to add without sending a diet', async () => {
        const cookies = await getCookieTest(userTest);
        const result = await testServer.post('/diet').set('Cookie', cookies);

        expect(result.error).toBeTruthy();
    });

    it('should not be possible to add without sending a title to the diet', async () => {
        const cookies = await getCookieTest(userTest);
        const result = await testServer.post('/diet').set('Cookie', cookies).send({ diet: { ...dietTest, title: null } });

        expect(result.statusCode).toEqual(dietError.submitTitle.status);
        expect(result.text).toMatch(dietError.submitTitle.message);
    });

    it('should not be possible to add food without sending it to the diet', async () => {
        const cookies = await getCookieTest(userTest);
        const result = await testServer.post('/diet').set('Cookie', cookies).send({ diet: { ...dietTest, content: [{}] } });

        expect(result.statusCode).toEqual(dietError.invalidFood.status);
        expect(result.text).toMatch(dietError.invalidFood.message);
    });

    it('should not be possible to add a diet by sending invalid food', async () => {
        const cookies = await getCookieTest(userTest);
        const result = await testServer.post('/diet').set('Cookie', cookies).send({ diet: { ...dietTest, content: [invalidFood] } });

        expect(result.statusCode).toEqual(dietError.invalidFood.status);
        expect(result.text).toMatch(dietError.invalidFood.message);
    });

    it('should add a diet correctly',  async () => {
        const cookies = await getCookieTest(userTest);
        const result = await testServer.post('/diet').set('Cookie', cookies).send({ diet: dietTest });

        expect(result.statusCode).toEqual(201);
        expect(result.body).toHaveProperty('message', 'Diet created successfully');
        expect(result.body).toHaveProperty('diet', dietTest);
    });

    afterAll(async () => {
        await deleteUserTest(userTest);
    });
});
