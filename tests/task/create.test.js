const request = require('supertest');
const app = require('../../app');

describe('Task Creation', () => {
    it('should create a new task', async () => {
      const taskData = { title: 'Sample Task', description: 'This is a sample task description.' };
      const response = await request(app)
        .post('/api/tasks')
        .send(taskData);
      
      expect(response.status).toBe(201);
    //   expect(response.body).toHaveProperty('id');
      
    });
  
    it('should return an error for invalid task data', async () => {
      const invalidTaskData = { title: '', description: 'Invalid task description.' }; // Empty title
      const response = await request(app)
        .post('/api/tasks')
        .send(invalidTaskData);
      
      expect(response.status).toBe(400);
      
    });
  
    it('should return an error for server error during task creation', async () => {
      // Mocking the server error scenario, for example by passing invalid data to trigger an error
      const taskData = { title: null, description: 'This task creation will fail.' };
      const response = await request(app)
        .post('/api/tasks')
        .send(taskData);
      
      expect(response.status).toBe(400);
    
    });
  });
  