'use strict';
const path = require('path');
const express = require('express');
const { Pool } = require('pg');

const ERAS = ['Triassic', 'Jurassic', 'Cretaceous'];
const DIETS = ['Herbivore', 'Carnivore', 'Omnivore'];

// "db" is the Compose service name; Docker's DNS resolves it on the shared network.
const pool = new Pool({
  host: process.env.DB_HOST || 'db',
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});

const app = express();
app.use(express.json({ limit: '10kb' }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/health', async (_req, res) => {
  try { await pool.query('SELECT 1'); res.json({ status: 'ok' }); }
  catch { res.status(503).json({ status: 'db unavailable' }); }
});

app.get('/dinosaurs', async (_req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, name, era, diet, fun_fact, created_at FROM dinosaurs ORDER BY created_at DESC, id DESC'
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not load the dinosaurs.' });
  }
});

app.post('/dinosaurs', async (req, res) => {
  const { name, era, diet, fun_fact } = req.body || {};
  const clean = (v) => (typeof v === 'string' ? v.trim() : '');
  const dino = { name: clean(name), era: clean(era), diet: clean(diet), fun_fact: clean(fun_fact) };

  const errors = [];
  if (!dino.name || dino.name.length > 80) errors.push('name must be 1-80 characters');
  if (!ERAS.includes(dino.era)) errors.push(`era must be one of: ${ERAS.join(', ')}`);
  if (!DIETS.includes(dino.diet)) errors.push(`diet must be one of: ${DIETS.join(', ')}`);
  if (!dino.fun_fact || dino.fun_fact.length > 300) errors.push('fun_fact must be 1-300 characters');
  if (errors.length) return res.status(400).json({ error: errors.join('; ') });

  try {
    const { rows } = await pool.query(
      `INSERT INTO dinosaurs (name, era, diet, fun_fact)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, era, diet, fun_fact, created_at`,
      [dino.name, dino.era, dino.diet, dino.fun_fact]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not save the dinosaur.' });
  }
});

const port = Number(process.env.PORT) || 3000;
const server = app.listen(port, '0.0.0.0', () => console.log(`Little Dino Sanctuary on :${port}`));

const shutdown = () => server.close(() => pool.end().then(() => process.exit(0)));
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
