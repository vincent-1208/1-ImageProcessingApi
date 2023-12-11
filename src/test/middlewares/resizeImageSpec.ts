import app from '../../server';
import request from 'supertest';

describe('Resize image', () => {
  let req;
  it('Missing file name, width, height', async () => {
    req = {
      filename: '',
      width: 200,
      height: 200,
    };
    const response = await request(app).get('/api/resizeImage').query(req);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: 'Missing filename, height, or width.',
    });
  });

  it('Image not exist', async () => {
    req = {
      filename: 'pikachu3',
      width: 200,
      height: 200,
    };
    const response = await request(app).get('/api/resizeImage').query(req);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Image not exist.' });
  });

  it('Width or height is correct', async () => {
    req = {
      filename: 'pikachu',
      width: -200,
      height: 200,
    };
    const response = await request(app).get('/api/resizeImage').query(req);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Width or height is incorrect.' });
  });

  it('Resize image success.', async () => {
    req = {
      filename: 'pikachu',
      width: 200,
      height: 200,
    };
    const response = await request(app).get('/api/resizeImage').query(req);
    expect(response.status).toBe(200);
  });
});
