import { afterAll, beforeAll, beforeEach ,describe, expect, it } from 'vitest';
import { testServer } from '../vitest.setup';
import { createUserTest, deleteUserTest, getCookieTest } from '../helpers';
//@ts-ignore
import { dietError, invalidId } from '@/constants/errors';

const userTest = {
    username: 'TestUser13',
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

const newDietTest = {
    title: 'new diet test',
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

const invalidFood = {
    _id: '1',
    grams: 1,
    fiber: 1
};


describe('/diet/:id', () => {
    beforeAll(async () => {
        await createUserTest(userTest);
    });

    it('should not be possible to update without sending a diet', async () => {
        const cookies = await getCookieTest(userTest);
        await testServer.post('/diet').set('Cookie', cookies).send({ diet: dietTest });
        const getAllUserDiets = await testServer.get('/diet/').set('Cookie', cookies);

        const firstDietId = Object.keys(getAllUserDiets.body.diet)[0];
        const result = await testServer.patch(`/diet/${firstDietId}`).set('Cookie', cookies);
        await testServer.delete('/diet').set('Cookie', cookies);

        expect(result.error).toBeTruthy();
    });

    it('should not be possible to update without sending a title to the diet', async () => {
        const cookies = await getCookieTest(userTest);
        await testServer.post('/diet').set('Cookie', cookies).send({ diet: dietTest });
        const getAllUserDiets = await testServer.get('/diet/').set('Cookie', cookies);

        const firstDietId = Object.keys(getAllUserDiets.body.diet)[0];
        const result = await testServer.patch(`/diet/${firstDietId}`).set('Cookie', cookies).send({ diet: { ...dietTest, title: null } });
        await testServer.delete('/diet').set('Cookie', cookies);

        expect(result.statusCode).toEqual(dietError.submitTitle.status);
        expect(result.text).toMatch(dietError.submitTitle.message);
    });

    it('should not be possible to update the diet without sending a food', async () => {
        const cookies = await getCookieTest(userTest);
        await testServer.post('/diet').set('Cookie', cookies).send({ diet: dietTest });
        const getAllUserDiets = await testServer.get('/diet/').set('Cookie', cookies);

        const firstDietId = Object.keys(getAllUserDiets.body.diet)[0];
        const result = await testServer.patch(`/diet/${firstDietId}`).set('Cookie', cookies).send({ diet: { ...dietTest, content: [{}] } });
        await testServer.delete('/diet').set('Cookie', cookies);

        expect(result.statusCode).toEqual(dietError.invalidFood.status);
        expect(result.text).toMatch(dietError.invalidFood.message);
    });


    it('should not be possible to update a diet by sending invalid food', async () => {
        const cookies = await getCookieTest(userTest);
        await testServer.post('/diet').set('Cookie', cookies).send({ diet: dietTest });
        const getAllUserDiets = await testServer.get('/diet').set('Cookie', cookies);

        const firstDietId = Object.keys(getAllUserDiets.body.diet)[0];
        const result = await testServer.patch(`/diet/${firstDietId}`).set('Cookie', cookies).send({ diet: { ...dietTest, content: [invalidFood] } });
        await testServer.delete('/diet').set('Cookie', cookies);

        expect(result.statusCode).toEqual(dietError.invalidFood.status);
        expect(result.text).toMatch(dietError.invalidFood.message);
    });


    it('should not be possible to update a diet with an invalid type id', async () => {
        const cookies = await getCookieTest(userTest);

        await testServer.post('/diet').set('Cookie', cookies).send({ diet: dietTest });
        const result = await testServer.patch('/diet/123').set('Cookie', cookies).send({ diet: newDietTest});
        await testServer.delete('/diet').set('Cookie', cookies);

        expect(result.statusCode).toEqual(invalidId.status);
        expect(result.text).toMatch(invalidId.message);
    });

    it('should not be possible to update a diet that has already been deleted', async () => {
        const cookies = await getCookieTest(userTest);

        await testServer.post('/diet').set('Cookie', cookies).send({ diet: dietTest });
        await testServer.post('/diet').set('Cookie', cookies).send({ diet: dietTest });
        const getAllUserDiets = await testServer.get('/diet').set('Cookie', cookies);

        const firstDietId = Object.keys(getAllUserDiets.body.diet)[0];
        await testServer.delete(`/diet/${firstDietId}`).set('Cookie', cookies);

        const result = await testServer.patch(`/diet/${firstDietId}`).set('Cookie', cookies).send({ diet: newDietTest});
        await testServer.delete('/diet').set('Cookie', cookies);

        expect(result.statusCode).toEqual(dietError.notFound.status);
        expect(result.text).toMatch(dietError.notFound.message);
    });

    it('should update diet correctly',  async () => {
        const cookies = await getCookieTest(userTest);

        await testServer.post('/diet').set('Cookie', cookies).send({ diet: dietTest });
        const getAllUserDiets = await testServer.get('/diet').set('Cookie', cookies);

        const firstDietId = Object.keys(getAllUserDiets.body.diet)[0];
        const result = await testServer.patch(`/diet/${firstDietId}`).set('Cookie', cookies).send({ diet: newDietTest });;

        const getNewUserDiets = await testServer.get('/diet').set('Cookie', cookies);

        expect(result.statusCode).toEqual(200);
        expect(result.body).toHaveProperty('message', 'Diet successfully updated');
        expect(getNewUserDiets.body.diet).toHaveProperty(firstDietId, newDietTest);
        expect(getNewUserDiets.body.diet).not.toHaveProperty(firstDietId, dietTest);
    });

    afterAll(async () => {
        await deleteUserTest(userTest);
    });
});
