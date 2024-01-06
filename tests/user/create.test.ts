import { describe, expect, it } from "vitest";
import { testServer } from "../vitest.setup";

const userTest = {
    username: 'John Doe',
    password: 'test12345'
}

describe('/user', () => {
    it('should create a user correctly', async () => {
        const result = await testServer.post('/user').send(userTest);

        expect(result.statusCode).toEqual(201);
        expect(result.body).toHaveProperty('message', 'User created successfully');
        expect(result.body).toHaveProperty('user');
        expect(result.body.user).toHaveProperty('username', userTest.username);
        expect(result.body.user).toHaveProperty('id');
    });

    it('should delete a user correctly',  async () => {
        const cookies = (await testServer.post('/auth').send(userTest)).header['set-cookie'];
        const result = await testServer.delete('/user').set('Cookie', cookies);

        expect(result.statusCode).toEqual(200);
        expect(result.body).toHaveProperty('message', 'User successfully deleted');
    });
})