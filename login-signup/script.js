const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.set('strictQuery', true);
mongoose.connect('mongodb:///0.0.0.0:27017/innovatrixDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', userSchema);


app.post('/login-endpoint', (req, res) => {
  const { username, password } = req.body;


  User.findOne({ username, password }, (err, user) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else if (user) {

      res.redirect('/landing/index.html');
    } else {

      res.status(401).send('Invalid username or password');
    }
  });
});


app.post('/signup-endpoint', (req, res) => {
  const { username, password } = req.body;


  User.findOne({ username }, (err, existingUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else if (existingUser) {

      res.status(409).send('Username already taken');
    } else {

      const newUser = new User({ username, password });
      newUser.save((err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
        } else {

          res.redirect('/landing/index.html');
        }
      });
    }
  });
});


app.listen(3000, () => {
  console.log('Server started on port 3000');
});
