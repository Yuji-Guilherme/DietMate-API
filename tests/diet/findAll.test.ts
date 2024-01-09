import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { testServer } from '../vitest.setup';
import { createUserTest, deleteUserTest, getCookieTest } from '../helpers';

const userTest = {
    username: 'TestUser9',
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

const dietTest2 = {
    title: 'diet test',
    content: [{
        _id: '2',
        number: 2,
        description: 'food test2',
        grams: 1,
        calories: 1,
        carbs: 1,
        fat: 1,
        protein: 1,
        fiber: 1
    }]
};


describe('/diet', () => {
    beforeAll(async () => {
        await createUserTest(userTest);
    });

    it('should not be possible to find the diet without the user having a diet', async () => {
        const cookies = await getCookieTest(userTest);
        const result = await testServer.get('/diet').set('Cookie', cookies);

        expect(result.statusCode).toEqual(204);
    });

    it('should find all user diets correctly',  async () => {
        const cookies = await getCookieTest(userTest);

        await testServer.post('/diet').set('Cookie', cookies).send({ diet: dietTest });
        await testServer.post('/diet').set('Cookie', cookies).send({ diet: dietTest2 });
        const result = await testServer.get('/diet').set('Cookie', cookies);

        const firstDietId = Object.keys(result.body.diet)[0];
        const secondDietId = Object.keys(result.body.diet)[1];

        expect(result.statusCode).toEqual(200);
        expect(result.body).toHaveProperty('diet');
        expect(result.body.diet).toHaveProperty(firstDietId, dietTest);
        expect(result.body.diet).toHaveProperty(secondDietId, dietTest2);
    });

    afterAll(async () => {
        await deleteUserTest(userTest);
    });
});
