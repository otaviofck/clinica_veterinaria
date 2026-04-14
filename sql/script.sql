CREATE TABLE tutores (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  telefone VARCHAR(20),
  email VARCHAR(100)
);

CREATE TABLE animais (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  especie VARCHAR(50),
  raca VARCHAR(50),
  data_nascimento DATE,
  tutor_id INTEGER REFERENCES tutores(id)
);

CREATE TABLE consultas (
  id SERIAL PRIMARY KEY,
  animal_id INTEGER REFERENCES animais(id),
  data_consulta TIMESTAMP NOT NULL,
  motivo TEXT,
  diagnostico TEXT,
  veterinario VARCHAR(100)
);