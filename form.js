const express = require('express');
const xss = require('xss');
const { Client } = require('pg');
const connectionString = process.env.DATABASE_URL ||
  'postgres://:@localhost/form';
// const admin = require('./admin');

const router = express.Router();

function form(req, res) {
  const data = {};
  res.render('form', { data });
}

function ensureLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.redirect('/login');
}

router.get('/admin', ensureLoggedIn, (req, res) => {

  res.render('form', {});
});

async function addToForm(name, email, amount, ssn) {
  const client = new Client({ connectionString });
  await client.connect();
  await client.query('INSERT INTO form (name) VALUES ($1)', [name]);
  await client.query('INSERT INTO form (email) VALUES ($1)', [email]);
  await client.query('INSERT INTO form (amount) VALUES ($1)', [amount]);
  await client.query('INSERT INTO form (ssn) VALUES ($1)', [ssn]);
  await client.end();
}

router.post('/form', async (req, res) => {
  const { name } = req.body;

  await addToForm(xss(name));

  res.redirect('/admin');
});

router.get('/', form);

module.exports = router;
