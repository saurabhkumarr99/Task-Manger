const request = require('supertest');
const app = require('../../app');

 describe('User Registration', () => {
  it('should register a new user', async () => {
    const userData = { username: 'testuser1', email: 'test1@example.com', password: 'password123' };
    const response = await request(app)
      .post('/api/users/register')
      .send(userData);
    
    expect(response.status).toBe(201);
    // expect(response.body).toHaveProperty('id');
  
  });

  it('should return error for invalid registration data', async () => {
    const invalidData = { username: 'testuser',email:'', password: 'short' };
    const response = await request(app)
      .post('/api/users/register')
      .send(invalidData);
    
    expect(response.status).toBe(400);
  
  });
});
