import request from 'supertest';
import app from '../../src/app';
import { NextFunction } from 'express';

jest.mock(
  '../../src/middleware/checkUserJWT',
  () => (res: Response, req: Request, next: NextFunction) => next(null)
);

describe('User Routes', () => {
  it('should validate token', async () => {
    const response = await request(app)
      .get('/auth/validate')
      .set('Authorization', 'Bearer sfsfsfsfsdfsdfsd');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Token validated');
  });
});
