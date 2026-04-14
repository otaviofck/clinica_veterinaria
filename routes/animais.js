const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET todos
router.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM animais');
  res.json(result.rows);
});

// GET por id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await pool.query(
    'SELECT * FROM animais WHERE id = $1',
    [id]
  );
  res.json(result.rows[0]);
});

// POST
router.post('/', async (req, res) => {
  const { nome, especie, raca, data_nascimento, tutor_id } = req.body;

  const result = await pool.query(
    `INSERT INTO animais (nome, especie, raca, data_nascimento, tutor_id)
     VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [nome, especie, raca, data_nascimento, tutor_id]
  );

  res.status(201).json(result.rows[0]);
});

// PUT
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, especie, raca, data_nascimento, tutor_id } = req.body;

  const result = await pool.query(
    `UPDATE animais 
     SET nome=$1, especie=$2, raca=$3, data_nascimento=$4, tutor_id=$5 
     WHERE id=$6 RETURNING *`,
    [nome, especie, raca, data_nascimento, tutor_id, id]
  );

  res.json(result.rows[0]);
});

// DELETE
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  await pool.query('DELETE FROM animais WHERE id=$1', [id]);

  res.json({ message: 'Animal removido' });
});

module.exports = router;

router.get('/:id/consultas', async (req, res) => {
  const { id } = req.params;

  const result = await pool.query(`
    SELECT consultas.*, animais.nome AS nome_animal
    FROM consultas
    JOIN animais ON consultas.animal_id = animais.id
    WHERE animais.id = $1
  `, [id]);

  res.json(result.rows);
});