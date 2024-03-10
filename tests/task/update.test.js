const request = require('supertest');
const app = require('../../app');

describe('Task Update', () => {
  it('should update an existing task', async () => {
    // First, create a new task to update
    const createResponse = await request(app)
      .post('/api/tasks')
      .send({ title: 'Sample Task', description: 'This is a sample task description.' });

    const taskId = createResponse.body.id;

    // Now, update the task
    const updatedData = { title: 'Updated Task Title', description: 'Updated task description.' };
    const updateResponse = await request(app)
      .post(`/api/tasks/${taskId}`)
      .send(updatedData);

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body).toMatchObject(updatedData);
  });

  it('should return error for updating non-existing task', async () => {
    const nonExistingTaskId = '1010';
    const updatedData = { title: 'Updated Task Title', description: 'Updated task description.' };
    const updateResponse = await request(app)
      .post(`/api/tasks/${nonExistingTaskId}`)
      .send(updatedData);

    expect(updateResponse.status).toBe(404);
    expect(updateResponse.body).toHaveProperty('error', 'Task not found');
  });

 
});
