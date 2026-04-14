const express = require('express');
const app = express();

app.use(express.json());

const tutoresRoutes = require('./routes/tutores');
const animaisRoutes = require('./routes/animais');
const consultasRoutes = require('./routes/consultas');

app.use('/tutores', tutoresRoutes);
app.use('/animais', animaisRoutes);
app.use('/consultas', consultasRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});