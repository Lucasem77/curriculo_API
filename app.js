const express = require('express');
const pool = require('./db');
const app = express();

app.use(express.json());

app.get('/curriculo', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM curriculo');
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/curriculo', async (req, res) => {
    const { name, email, phone, summary, skills, experience, education } = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO resume (name, email, phone, summary, skills, experience, education) 
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [name, email, phone, summary, skills, experience, education]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
