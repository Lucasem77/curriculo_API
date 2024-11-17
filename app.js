const express = require('express');
const pool = require('./db');
const app = express();

app.use(express.json());

app.get('/curriculo', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM curriculo');
        console.log(result)
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/curriculo', async (req, res) => {
    const { nome, number, phone_number, id, cep, email, complement, district, linkedin, nationality } = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO curriculo (nome, number, phone_number, id, cep, email, complement, district, linkedin, nationality) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
            [nome, number, phone_number, id, cep, email, complement, district, linkedin, nationality]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
