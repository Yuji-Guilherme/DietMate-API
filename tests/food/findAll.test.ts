import { describe, expect, it } from 'vitest';
import { testServer } from '../vitest.setup';

describe('/food', () => {
    it('should find all foods correctly',  async () => {
        const result = await testServer.get('/food');

        expect(result.statusCode).toEqual(200);
        expect(result.body.length).toBeGreaterThanOrEqual(453);
        expect(result.body[0]).toHaveProperty('_id');
        expect(result.body[0]).toHaveProperty('number', 1);
        expect(result.body[0]).toHaveProperty('description');
        expect(result.body[0]).toHaveProperty('calories');
        expect(result.body[0]).toHaveProperty('protein');
        expect(result.body[0]).toHaveProperty('fat');
        expect(result.body[0]).toHaveProperty('carbs');
        expect(result.body[0]).toHaveProperty('fiber');
    });
});
