const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const secrets = require('./secrets');

mongoose.connect(
  `mongodb+srv://${secrets.admin}:${secrets.password}@sandbox.diqjrsw.mongodb.net/userTest?retryWrites=true&w=majority`,
  {}
);

const userSchema = {
  email: String,
  password: String,
};

const User = new mongoose.model('User', userSchema);

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
app.get('/submitted', (req, res) => res.render('submit'));
app.get('/secrets', (req, res) => {
  res.render('secrets');
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({ email: username })
    .then((user) => {
      if (!user || user.password !== password) {
        console.log('Wrong username or password!');
        res.redirect('/');
      } else {
        res.redirect('/secrets');
      }
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/');
    });
});

app.post('/register', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({ email: username }).then((user) => {
    if (user) {
      res.redirect('/submitted');
    } else {
      const newUser = new User({
        email: username,
        password,
      });
      newUser
        .save()
        .then(() => {
          res.redirect('/submitted');
        })
        .catch((err) => {
          console.log(err);
          res.redirect('/');
        });
    }
  });
});

app.listen(3000, () => {
  console.log('Server stared on port 3000.');
});
