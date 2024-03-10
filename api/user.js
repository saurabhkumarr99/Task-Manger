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

// POST /users/register
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Check if username, email, or password is missing
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Username, email, and password are required' });
    }

    try {
        const client = await pool.connect();
        const result = await client.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *', [username, email, password]);
        const newUser = result.rows[0];
        client.release();
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Internal Server Error' });
    }
});

// POST /users/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
        const user = result.rows[0];
        client.release();

        if (user) {
            res.status(200).json({ message: 'Login successful', user });
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE /users/:username
router.delete('/:username', async (req, res) => {
    const { username } = req.params;

    try {
        const client = await pool.connect();
        const result = await client.query('DELETE FROM users WHERE username = $1 RETURNING *', [username]);
        const deletedUser = result.rows[0];
        client.release();

        if (deletedUser) {
            res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
