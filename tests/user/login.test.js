const request = require('supertest');
const app = require('../../app');

describe('User Login', () => {
  it('should login existing user with correct credentials', async () => {

    const userData1 = { username: 'testuser6', email: 'test6@example.com', password: 'password123' };
    const userData2 = { email: 'test6@example.com', password: 'password123' };
    const userData3 = { username: 'testuser6' };

    //Register
    const response1 = await request(app)
      .post('/api/users/register')
      .send(userData1);
    
    //Login
    const response2 = await request(app)
      .post('/api/users/login')
      .send(userData2);
    
    expect(response2.status).toBe(200);
    
    //Delete 
    const response3 = await request(app)
      .delete('/api/users')
      .send(userData3)
   
  });

  it('should return error for invalid credentials', async () => {
    const invalidData = { email: 'invalid@example.com', password: 'wrongpassword' };
    const response = await request(app)
      .post('/api/users/login')
      .send(invalidData);
    
    expect(response.status).toBe(401);

  });
});
