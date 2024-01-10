import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { testServer } from '../vitest.setup';
import { createUserTest, deleteUserTest, getCookieTest } from '../helpers';
//@ts-ignore
import { workoutError } from '@/constants/errors';

const userTest = {
    username: 'TestUser14',
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

const invalidExercise = {
    _id: '1',
    machine: true,
    bench: false
};

describe('/workout', () => {
    beforeAll(async () => {
        await createUserTest(userTest);
    });

    it('should not be possible to add without sending a workout', async () => {
        const cookies = await getCookieTest(userTest);
        const result = await testServer.post('/workout').set('Cookie', cookies);

        expect(result.error).toBeTruthy();
    });

    it('should not be possible to add without sending a title to the workout', async () => {
        const cookies = await getCookieTest(userTest);
        const result = await testServer.post('/workout').set('Cookie', cookies).send({ workout: { ...workoutTest, title: null } });

        expect(result.statusCode).toEqual(workoutError.submitTitle.status);
        expect(result.text).toMatch(workoutError.submitTitle.message);
    });

    it('should not be possible to add exercise without sending it to the workout', async () => {
        const cookies = await getCookieTest(userTest);
        const result = await testServer.post('/workout').set('Cookie', cookies).send({ workout: { ...workoutTest, content: [{}] } });

        expect(result.statusCode).toEqual(workoutError.invalidExercise.status);
        expect(result.text).toMatch(workoutError.invalidExercise.message);
    });

    it('should not be possible to add a workout by sending invalid exercise', async () => {
        const cookies = await getCookieTest(userTest);
        const result = await testServer.post('/workout').set('Cookie', cookies).send({ workout: { ...workoutTest, content: [invalidExercise] } });

        expect(result.statusCode).toEqual(workoutError.invalidExercise.status);
        expect(result.text).toMatch(workoutError.invalidExercise.message);
    });

    it('should add a workout correctly',  async () => {
        const cookies = await getCookieTest(userTest);
        const result = await testServer.post('/workout').set('Cookie', cookies).send({ workout: workoutTest });

        expect(result.statusCode).toEqual(201);
        expect(result.body).toHaveProperty('message', 'Workout created successfully');
        expect(result.body).toHaveProperty('workout', workoutTest);
    });

    afterAll(async () => {
        await deleteUserTest(userTest);
    });
});
