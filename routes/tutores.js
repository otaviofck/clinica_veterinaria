const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET todos
router.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM tutores');
  res.json(result.rows);
});

// GET por id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await pool.query(
    'SELECT * FROM tutores WHERE id = $1',
    [id]
  );
  res.json(result.rows[0]);
});

// POST
router.post('/', async (req, res) => {
  const { nome, telefone, email } = req.body;

  const result = await pool.query(
    'INSERT INTO tutores (nome, telefone, email) VALUES ($1,$2,$3) RETURNING *',
    [nome, telefone, email]
  );

  res.status(201).json(result.rows[0]);
});

// PUT
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, telefone, email } = req.body;

  const result = await pool.query(
    'UPDATE tutores SET nome=$1, telefone=$2, email=$3 WHERE id=$4 RETURNING *',
    [nome, telefone, email, id]
  );

  res.json(result.rows[0]);
});

// DELETE
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  await pool.query('DELETE FROM tutores WHERE id=$1', [id]);

  res.json({ message: 'Tutor removido' });
});

module.exports = router;