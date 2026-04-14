const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET todas
router.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM consultas');
  res.json(result.rows);
});

// GET por id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await pool.query(
    'SELECT * FROM consultas WHERE id = $1',
    [id]
  );
  res.json(result.rows[0]);
});

// POST
router.post('/', async (req, res) => {
  const { animal_id, data_consulta, motivo, diagnostico, veterinario } = req.body;

  const result = await pool.query(
    `INSERT INTO consultas (animal_id, data_consulta, motivo, diagnostico, veterinario)
     VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [animal_id, data_consulta, motivo, diagnostico, veterinario]
  );

  res.status(201).json(result.rows[0]);
});

// PUT
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { animal_id, data_consulta, motivo, diagnostico, veterinario } = req.body;

  const result = await pool.query(
    `UPDATE consultas 
     SET animal_id=$1, data_consulta=$2, motivo=$3, diagnostico=$4, veterinario=$5 
     WHERE id=$6 RETURNING *`,
    [animal_id, data_consulta, motivo, diagnostico, veterinario, id]
  );

  res.json(result.rows[0]);
});

// DELETE
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  await pool.query('DELETE FROM consultas WHERE id=$1', [id]);

  res.json({ message: 'Consulta removida' });
});

module.exports = router;