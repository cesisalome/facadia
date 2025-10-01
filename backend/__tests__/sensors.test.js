import request from 'supertest';
import app from '../server.js';
import { resetSensors } from '../sensors.js';

describe('POST /sensors', () => {
  beforeEach(() => {
    resetSensors();
  });

  it('should add a sensor with valid data', async () => {
    const res = await request(app)
      .post('/sensors')
      .send({ name: 'TempSensor', type: 'temperature' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('TempSensor');
    expect(res.body.type).toBe('temperature');
  });

  it('should return 400 if required fields are missing', async () => {
    const res = await request(app)
      .post('/sensors')
      .send({ name: 'IncompleteSensor' });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});

// node --experimental-vm-modules node_modules/jest/bin/jest.js