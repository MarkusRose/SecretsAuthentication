const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/login', (req, res) => {
  res.render('login');
});
app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/login', (req, res) => {
  const newUser = {
    name: req.body.username,
    password: req.body.password,
  };
  console.log(newUser);
  res.redirect('/');
});

app.post('/register', (req, res) => {
  const newUser = {
    name: req.body.username,
    password: req.body.password,
  };
  console.log(newUser);
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Server stared on port 3000.');
});
