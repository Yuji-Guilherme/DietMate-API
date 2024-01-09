import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { testServer } from '../vitest.setup';
import { createUserTest, deleteUserTest, getCookieTest } from '../helpers';
//@ts-ignore
import { dietError, invalidId } from '@/constants/errors';

const userTest = {
    username: 'TestUser12',
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


describe('/diet/:id', () => {
    beforeAll(async () => {
        await createUserTest(userTest);
    });

    it('should not be possible to delete a diet with an invalid type id', async () => {
        const cookies = await getCookieTest(userTest);

        await testServer.post('/diet').set('Cookie', cookies).send({ diet: dietTest });
        const result = await testServer.delete('/diet/123').set('Cookie', cookies);
        await testServer.delete('/diet').set('Cookie', cookies);

        expect(result.statusCode).toEqual(invalidId.status);
        expect(result.text).toMatch(invalidId.message);
    });

    it('should not be possible to exclude a diet twice', async () => {
        const cookies = await getCookieTest(userTest);

        await testServer.post('/diet').set('Cookie', cookies).send({ diet: dietTest });
        await testServer.post('/diet').set('Cookie', cookies).send({ diet: dietTest2 });
        const getAllUserDiets = await testServer.get('/diet').set('Cookie', cookies);

        const firstDietId = Object.keys(getAllUserDiets.body.diet)[0];
        await testServer.delete(`/diet/${firstDietId}`).set('Cookie', cookies);

        const result = await testServer.delete(`/diet/${firstDietId}`).set('Cookie', cookies);
        await testServer.delete('/diet').set('Cookie', cookies);

        expect(result.statusCode).toEqual(dietError.notFound.status);
        expect(result.text).toMatch(dietError.notFound.message);
    });

    it('should delete one user diet correctly',  async () => {
        const cookies = await getCookieTest(userTest);

        await testServer.post('/diet').set('Cookie', cookies).send({ diet: dietTest });
        await testServer.post('/diet').set('Cookie', cookies).send({ diet: dietTest2 });
        const getAllUserDiets = await testServer.get('/diet').set('Cookie', cookies);

        const firstDietId = Object.keys(getAllUserDiets.body.diet)[0];
        const secondDietId = Object.keys(getAllUserDiets.body.diet)[1];
        const result = await testServer.delete(`/diet/${firstDietId}`).set('Cookie', cookies);

        const getNewUserDiets = await testServer.get('/diet').set('Cookie', cookies);

        expect(result.statusCode).toEqual(200);
        expect(result.body).toHaveProperty('message', 'Diet successfully deleted');
        expect(getNewUserDiets.body.diet).toHaveProperty(secondDietId, dietTest2);
        expect(getNewUserDiets.body.diet).not.toHaveProperty(firstDietId, dietTest);
    });

    afterAll(async () => {
        await deleteUserTest(userTest);
    });
});
