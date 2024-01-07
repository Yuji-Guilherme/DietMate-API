import { describe, expect, it } from 'vitest';
import { testServer } from '../vitest.setup';

describe('/exercise', () => {
    it('should find all exercises correctly',  async () => {
        const result = await testServer.get('/exercise');

        expect(result.statusCode).toEqual(200);
        expect(result.body.length).toBeGreaterThanOrEqual(98);
        expect(result.body[0]).toHaveProperty('_id');
        expect(result.body[0]).toHaveProperty('number', 1);
        expect(result.body[0]).toHaveProperty('exercise');
        expect(result.body[0]).toHaveProperty('muscle');
        expect(result.body[0]).toHaveProperty('unilateral');
        expect(result.body[0]).toHaveProperty('dumbbell');
        expect(result.body[0]).toHaveProperty('cable');
        expect(result.body[0]).toHaveProperty('barbell');
        expect(result.body[0]).toHaveProperty('smith');
        expect(result.body[0]).toHaveProperty('machine');
        expect(result.body[0]).toHaveProperty('bench');
    });
});
