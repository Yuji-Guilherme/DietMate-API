import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { testServer } from '../vitest.setup';
import { createUserTest, deleteUserTest, getCookieTest } from '../helpers';

const userTest = {
    username: 'TestUser10',
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

    it('should not be possible to delete diets without the user having a diet', async () => {
        const cookies = await getCookieTest(userTest);
        const result = await testServer.delete('/diet').set('Cookie', cookies);

        expect(result.statusCode).toEqual(204);
    });

    it('should delete all user diets correctly',  async () => {
        const cookies = await getCookieTest(userTest);

        await testServer.post('/diet').set('Cookie', cookies).send({ diet: dietTest });
        await testServer.post('/diet').set('Cookie', cookies).send({ diet: dietTest2 });

        const result = await testServer.delete('/diet').set('Cookie', cookies);
        const userDietResult = await testServer.get('/diet').set('Cookie', cookies);

        expect(result.statusCode).toEqual(200);
        expect(result.body).toHaveProperty('message', 'Diets successfully deleted');
        expect(userDietResult.statusCode).toEqual(204);
    });

    afterAll(async () => {
        await deleteUserTest(userTest);
    });
});
