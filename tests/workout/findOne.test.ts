import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { testServer } from '../vitest.setup';
import { createUserTest, deleteUserTest, getCookieTest } from '../helpers';
//@ts-ignore
import { workoutError, invalidId } from '@/constants/errors';

const userTest = {
    username: 'TestUser17',
    password: 'test12345'
};

const workoutTest = {
    title: 'workout test',
    content: [{
        _id: '1',
        number: 1,
        exercise: 'test exercise',
        muscle: 'muscle test',
        unilateral: true,
        dumbbell: false,
        cable: true,
        barbell: false,
        smith: true,
        machine: false,
        bench: true
    }]
};

const workoutTest2 = {
    title: 'workout test 2',
    content: [{
        _id: '2',
        number: 1,
        exercise: 'test exercise 2',
        muscle: 'muscle test 2',
        unilateral: false,
        dumbbell: true,
        cable: false,
        barbell: true,
        smith: false,
        machine: true,
        bench: false
    }]
};

describe('/workout/:id', () => {
    beforeAll(async () => {
        await createUserTest(userTest);
    });

    it('should not be possible to get a workout with an invalid type id', async () => {
        const cookies = await getCookieTest(userTest);

        await testServer.post('/workout').set('Cookie', cookies).send({ workout: workoutTest });
        const result = await testServer.get('/workout/123').set('Cookie', cookies);

        expect(result.statusCode).toEqual(invalidId.status);
        expect(result.text).toMatch(invalidId.message);
    });

    it('should not be possible to get a workout with id already excluded', async () => {
        const cookies = await getCookieTest(userTest);

        await testServer.post('/workout').set('Cookie', cookies).send({ workout: workoutTest });
        await testServer.post('/workout').set('Cookie', cookies).send({ workout: workoutTest2 });
        const getAllUserWorkouts = await testServer.get('/workout').set('Cookie', cookies);

        const firstWorkoutId = Object.keys(getAllUserWorkouts.body.workout)[0];
        await testServer.delete(`/workout/${firstWorkoutId}`).set('Cookie', cookies);

        const result = await testServer.get(`/workout/${firstWorkoutId}`).set('Cookie', cookies);

        expect(result.statusCode).toEqual(workoutError.notFound.status);
        expect(result.text).toMatch(workoutError.notFound.message);
    });

    it('should find one user workout correctly',  async () => {
        const cookies = await getCookieTest(userTest);

        await testServer.post('/workout').set('Cookie', cookies).send({ workout: workoutTest });
        await testServer.post('/workout').set('Cookie', cookies).send({ workout: workoutTest2 });
        const getAllUserWorkouts = await testServer.get('/workout').set('Cookie', cookies);

        const firstWorkoutId = Object.keys(getAllUserWorkouts.body.workout)[0];
        const result = await testServer.get(`/workout/${firstWorkoutId}`).set('Cookie', cookies);

        expect(result.statusCode).toEqual(200);
        expect(result.body).toHaveProperty('workout');
        expect(result.body.workout).toMatchObject(workoutTest);
        expect(result.body.workout).not.toMatchObject(workoutTest2);
    });

    afterAll(async () => {
        await deleteUserTest(userTest);
    });
});
