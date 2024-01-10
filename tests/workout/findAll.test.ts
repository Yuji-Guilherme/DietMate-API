import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { testServer } from '../vitest.setup';
import { createUserTest, deleteUserTest, getCookieTest } from '../helpers';

const userTest = {
    username: 'TestUser15',
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

describe('/workout', () => {
    beforeAll(async () => {
        await createUserTest(userTest);
    });

    it('should not be possible to find the workout without the user having a workout', async () => {
        const cookies = await getCookieTest(userTest);
        const result = await testServer.get('/workout').set('Cookie', cookies);

        expect(result.statusCode).toEqual(204);
    });

    it('should find all user workouts correctly',  async () => {
        const cookies = await getCookieTest(userTest);

        await testServer.post('/workout').set('Cookie', cookies).send({ workout: workoutTest });
        await testServer.post('/workout').set('Cookie', cookies).send({ workout: workoutTest2 });
        const result = await testServer.get('/workout').set('Cookie', cookies);

        const firstWorkoutId = Object.keys(result.body.workout)[0];
        const secondWorkoutId = Object.keys(result.body.workout)[1];

        expect(result.statusCode).toEqual(200);
        expect(result.body).toHaveProperty('workout');
        expect(result.body.workout).toHaveProperty(firstWorkoutId, workoutTest);
        expect(result.body.workout).toHaveProperty(secondWorkoutId, workoutTest2);
    });

    afterAll(async () => {
        await deleteUserTest(userTest);
    });
});
