const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'task_manager',
    password: 'admin',
    port: 5432,
});

// POST /tasks
router.post('/', async (req, res) => {
    const { title, description } = req.body;

    // Check if title or description is missing
    if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required' });
    }

    try {
        const client = await pool.connect();
        const result = await client.query('INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *', [title, description]);
        const newTask = result.rows[0];
        client.release();
        res.status(201).json(newTask);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Internal Server Error' });
    }
});

// GET /tasks
router.get('/', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM tasks');
        const tasks = result.rows;
        client.release();
        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Internal Server Error' });
    }
});

// GET /tasks/:id
router.get('/:id', async (req, res) => {
    const taskId = req.params.id;

    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM tasks WHERE id = $1', [taskId]);
        const task = result.rows[0];
        client.release();

        if (task) {
            res.status(200).json(task);
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Internal Server Error' });
    }
});

// POST /tasks/:id
router.post('/:id', async (req, res) => {
    const taskId = req.params.id;
    const { title, description } = req.body;

    try {
        const client = await pool.connect();
        const result = await client.query('UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *', [title, description, taskId]);
        const updatedTask = result.rows[0];
        client.release();

        if (updatedTask) {
            res.status(200).json(updatedTask);
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Internal Server Error' });
    }
});

// DELETE /tasks/:id
router.delete('/:id', async (req, res) => {
    const taskId = req.params.id;

    try {
        const client = await pool.connect();
        const result = await client.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [taskId]);
        const deletedTask = result.rows[0];
        client.release();

        if (deletedTask) {
            res.status(200).json({ message: 'Task deleted successfully' });
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: 'Task not found' });
    }
});

module.exports = router;
