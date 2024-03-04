import { afterAll, beforeAll ,describe, expect, it } from 'vitest';
import { testServer } from '../vitest.setup';
import { createUserTest, deleteUserTest, getCookieTest } from '../helpers';
//@ts-ignore
import { preferError } from '@/constants/errors';

const userTest = {
    username: 'TestUser21',
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


const newPreferTest = {
    water: 6,
    calories: 12
};


const invalidPrefer = {
    water: '5',
    calories: true
};


describe('/preference', () => {
    beforeAll(async () => {
        await createUserTest(userTest);
    });

    it('should not be possible to update without sending a preference', async () => {
        const cookies = await getCookieTest(userTest);
        await testServer.post('/preference').set('Cookie', cookies).send({ preference: preferTest });

        const result = await testServer.patch('/preference').set('Cookie', cookies);
        await testServer.delete('/preference').set('Cookie', cookies);

        expect(result.error).toBeTruthy();
    });

    it('should not be possible to update sending invalid preference', async () => {
        const cookies = await getCookieTest(userTest);
        await testServer.post('/preference').set('Cookie', cookies).send({ preference: preferTest });

        const result = await testServer.patch(`/preference`).set('Cookie', cookies).send({ preference: invalidPrefer });
        await testServer.delete('/preference').set('Cookie', cookies);

        expect(result.statusCode).toEqual(preferError.invalid.status);
        expect(result.text).toMatch(preferError.invalid.message);
    });

    it('should update preference correctly',  async () => {
        const cookies = await getCookieTest(userTest);

        await testServer.post('/preference').set('Cookie', cookies).send({ preference: preferTest });

        const result = await testServer.patch('/preference').set('Cookie', cookies).send({ preference: newPreferTest });;

        const getNewUserPreference = await testServer.get('/preference').set('Cookie', cookies);

        expect(result.statusCode).toEqual(200);
        expect(result.body).toHaveProperty('message', 'Preference successfully updated');
        expect(getNewUserPreference.body.preference).toEqual({...preferTest, ...newPreferTest});
        expect(getNewUserPreference.body.preference).not.toEqual(preferTest);
    });

    afterAll(async () => {
        await deleteUserTest(userTest);
    });
});
