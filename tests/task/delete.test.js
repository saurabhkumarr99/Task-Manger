const request = require('supertest');
const app = require('../../app');

describe('Task Delete', () => {
  it('should delete an existing task', async () => {
    // First, create a new task to delete
    const createResponse = await request(app)
      .post('/api/tasks')
      .send({ title: 'Sample Task', description: 'This is a sample task description.' });

    const taskId = createResponse.body.id;

    // Now, delete the task
    const deleteResponse = await request(app)
      .delete(`/api/tasks/${taskId}`);

    expect(deleteResponse.status).toBe(200);

  });

  it('should return error for deleting non-existing task', async () => {
    const nonExistingTaskId = '1012';
    const deleteResponse = await request(app)
      .delete(`/api/tasks/${nonExistingTaskId}`);

    expect(deleteResponse.status).toBe(404);
    expect(deleteResponse.body).toHaveProperty('error', 'Task not found');
  });

});
