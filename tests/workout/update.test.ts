import { afterAll, beforeAll, beforeEach ,describe, expect, it } from 'vitest';
import { testServer } from '../vitest.setup';
import { createUserTest, deleteUserTest, getCookieTest } from '../helpers';
//@ts-ignore
import { workoutError, invalidId } from '@/constants/errors';

const userTest = {
    username: 'TestUser19',
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

const newWorkoutTest = {
    title: 'new workout test',
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

const invalidExercise = {
    _id: '1',
    machine: true,
    bench: false
};

describe('/workout/:id', () => {
    beforeAll(async () => {
        await createUserTest(userTest);
    });

    it('should not be possible to update without sending a workout', async () => {
        const cookies = await getCookieTest(userTest);
        await testServer.post('/workout').set('Cookie', cookies).send({ workout: workoutTest });
        const getAllUserWorkouts = await testServer.get('/workout/').set('Cookie', cookies);

        const firstWorkoutId = Object.keys(getAllUserWorkouts.body.workout)[0];
        const result = await testServer.patch(`/workout/${firstWorkoutId}`).set('Cookie', cookies);
        await testServer.delete('/workout').set('Cookie', cookies);

        expect(result.error).toBeTruthy();
    });

    it('should not be possible to update without sending a title to the workout', async () => {
        const cookies = await getCookieTest(userTest);
        await testServer.post('/workout').set('Cookie', cookies).send({ workout: workoutTest });
        const getAllUserWorkouts = await testServer.get('/workout/').set('Cookie', cookies);

        const firstWorkoutId = Object.keys(getAllUserWorkouts.body.workout)[0];
        const result = await testServer.patch(`/workout/${firstWorkoutId}`).set('Cookie', cookies).send({ workout: { ...workoutTest, title: null } });
        await testServer.delete('/workout').set('Cookie', cookies);

        expect(result.statusCode).toEqual(workoutError.submitTitle.status);
        expect(result.text).toMatch(workoutError.submitTitle.message);
    });

    it('should not be possible to update the workout without sending a food', async () => {
        const cookies = await getCookieTest(userTest);
        await testServer.post('/workout').set('Cookie', cookies).send({ workout: workoutTest });
        const getAllUserWorkouts = await testServer.get('/workout/').set('Cookie', cookies);

        const firstWorkoutId = Object.keys(getAllUserWorkouts.body.workout)[0];
        const result = await testServer.patch(`/workout/${firstWorkoutId}`).set('Cookie', cookies).send({ workout: { ...workoutTest, content: [{}] } });
        await testServer.delete('/workout').set('Cookie', cookies);

        expect(result.statusCode).toEqual(workoutError.invalidExercise.status);
        expect(result.text).toMatch(workoutError.invalidExercise.message);
    });


    it('should not be possible to update a workout by sending invalid food', async () => {
        const cookies = await getCookieTest(userTest);
        await testServer.post('/workout').set('Cookie', cookies).send({ workout: workoutTest });
        const getAllUserWorkouts = await testServer.get('/workout').set('Cookie', cookies);

        const firstWorkoutId = Object.keys(getAllUserWorkouts.body.workout)[0];
        const result = await testServer.patch(`/workout/${firstWorkoutId}`).set('Cookie', cookies).send({ workout: { ...workoutTest, content: [invalidExercise] } });
        await testServer.delete('/workout').set('Cookie', cookies);

        expect(result.statusCode).toEqual(workoutError.invalidExercise.status);
        expect(result.text).toMatch(workoutError.invalidExercise.message);
    });


    it('should not be possible to update a workout with an invalid type id', async () => {
        const cookies = await getCookieTest(userTest);

        await testServer.post('/workout').set('Cookie', cookies).send({ workout: workoutTest });
        const result = await testServer.patch('/workout/123').set('Cookie', cookies).send({ workout: newWorkoutTest});
        await testServer.delete('/workout').set('Cookie', cookies);

        expect(result.statusCode).toEqual(invalidId.status);
        expect(result.text).toMatch(invalidId.message);
    });

    it('should not be possible to update a workout that has already been deleted', async () => {
        const cookies = await getCookieTest(userTest);

        await testServer.post('/workout').set('Cookie', cookies).send({ workout: workoutTest });
        await testServer.post('/workout').set('Cookie', cookies).send({ workout: workoutTest });
        const getAllUserWorkouts = await testServer.get('/workout').set('Cookie', cookies);

        const firstWorkoutId = Object.keys(getAllUserWorkouts.body.workout)[0];
        await testServer.delete(`/workout/${firstWorkoutId}`).set('Cookie', cookies);

        const result = await testServer.patch(`/workout/${firstWorkoutId}`).set('Cookie', cookies).send({ workout: newWorkoutTest});
        await testServer.delete('/workout').set('Cookie', cookies);

        expect(result.statusCode).toEqual(workoutError.notFound.status);
        expect(result.text).toMatch(workoutError.notFound.message);
    });

    it('should update workout correctly',  async () => {
        const cookies = await getCookieTest(userTest);

        await testServer.post('/workout').set('Cookie', cookies).send({ workout: workoutTest });
        const getAllUserWorkouts = await testServer.get('/workout').set('Cookie', cookies);

        const firstWorkoutId = Object.keys(getAllUserWorkouts.body.workout)[0];
        const result = await testServer.patch(`/workout/${firstWorkoutId}`).set('Cookie', cookies).send({ workout: newWorkoutTest });;

        const getNewUserWorkouts = await testServer.get('/workout').set('Cookie', cookies);

        expect(result.statusCode).toEqual(200);
        expect(result.body).toHaveProperty('message', 'Workout successfully updated');
        expect(getNewUserWorkouts.body.workout).toHaveProperty(firstWorkoutId, newWorkoutTest);
        expect(getNewUserWorkouts.body.workout).not.toHaveProperty(firstWorkoutId, workoutTest);
    });

    afterAll(async () => {
        await deleteUserTest(userTest);
    });
});
