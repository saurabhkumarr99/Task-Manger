const request = require('supertest');
const app = require('../../app');

describe('Task Read', () => {

  it('should retrieve all tasks', async () => {
    const response = await request(app)
      .get('/api/tasks');

    expect(response.status).toBe(200);
    
     
  });

  it('should retrieve a specific task by ID', async () => {
    // First, create a new task to read
    const createResponse = await request(app)
      .post('/api/tasks')
      .send({ title: 'Sample Task', description: 'This is a sample task description.' });

    const taskId = createResponse.body.id;

    // Now, retrieve the task by its ID
    const readResponse = await request(app)
      .get(`/api/tasks/${taskId}`);

    expect(readResponse.status).toBe(200);
    expect(readResponse.body).toHaveProperty('id', taskId);
     
  });

  it('should return error for retrieving non-existing task', async () => {
    const nonExistingTaskId = '101';
    const readResponse = await request(app)
      .get(`/api/tasks/${nonExistingTaskId}`);

    expect(readResponse.status).toBe(404);
    // expect(readResponse.body).toHaveProperty('error', 'Task not found');
  });

  
});
