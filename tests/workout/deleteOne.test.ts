import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { testServer } from '../vitest.setup';
import { createUserTest, deleteUserTest, getCookieTest } from '../helpers';
//@ts-ignore
import { workoutError, invalidId } from '@/constants/errors';

const userTest = {
    username: 'TestUser18',
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

    it('should not be possible to delete a workout with an invalid type id', async () => {
        const cookies = await getCookieTest(userTest);

        await testServer.post('/workout').set('Cookie', cookies).send({ workout: workoutTest });
        const result = await testServer.delete('/workout/123').set('Cookie', cookies);
        await testServer.delete('/workout').set('Cookie', cookies);

        expect(result.statusCode).toEqual(invalidId.status);
        expect(result.text).toMatch(invalidId.message);
    });

    it('should not be possible to exclude a workout twice', async () => {
        const cookies = await getCookieTest(userTest);

        await testServer.post('/workout').set('Cookie', cookies).send({ workout: workoutTest });
        await testServer.post('/workout').set('Cookie', cookies).send({ workout: workoutTest2 });
        const getAllUserWorkouts = await testServer.get('/workout').set('Cookie', cookies);

        const firstWorkoutId = Object.keys(getAllUserWorkouts.body.workout)[0];
        await testServer.delete(`/workout/${firstWorkoutId}`).set('Cookie', cookies);

        const result = await testServer.delete(`/workout/${firstWorkoutId}`).set('Cookie', cookies);
        await testServer.delete('/workout').set('Cookie', cookies);

        expect(result.statusCode).toEqual(workoutError.notFound.status);
        expect(result.text).toMatch(workoutError.notFound.message);
    });

    it('should delete one user workout correctly',  async () => {
        const cookies = await getCookieTest(userTest);

        await testServer.post('/workout').set('Cookie', cookies).send({ workout: workoutTest });
        await testServer.post('/workout').set('Cookie', cookies).send({ workout: workoutTest2 });
        const getAllUserWorkouts = await testServer.get('/workout').set('Cookie', cookies);

        const firstWorkoutId = Object.keys(getAllUserWorkouts.body.workout)[0];
        const secondWorkoutId = Object.keys(getAllUserWorkouts.body.workout)[1];
        const result = await testServer.delete(`/workout/${firstWorkoutId}`).set('Cookie', cookies);

        const getNewUserWorkouts = await testServer.get('/workout').set('Cookie', cookies);

        expect(result.statusCode).toEqual(200);
        expect(result.body).toHaveProperty('message', 'Workout successfully deleted');
        expect(getNewUserWorkouts.body.workout).toHaveProperty(secondWorkoutId, workoutTest2);
        expect(getNewUserWorkouts.body.workout).not.toHaveProperty(firstWorkoutId, workoutTest);
    });

    afterAll(async () => {
        await deleteUserTest(userTest);
    });
});
