const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const FormDataModel = require('./models/FormData');

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect('mongodb://localhost:27017/')
  .then(() => console.log('DB Connected'));

app.post('/register', (req, res) => {
  // To post / insert data into database

  const { email, password } = req.body;
  FormDataModel.findOne({ email: email }).then((user) => {
    if (user) {
      res.json('Already registered');
    } else {
      FormDataModel.create(req.body)
        .then((log_reg_form) => {
          res.json(log_reg_form);
          console.log('registered');
        })
        .catch((err) => res.json(err));
    }
  });
});

app.post('/login', (req, res) => {
  // To find record from the database
  const { email, password } = req.body;
  FormDataModel.findOne({ email: email }).then((user) => {
    if (user) {
      // If user found then these 2 cases
      if (user.password === password) {
        res.json({ status: 'Success', name: user.name, email: user.email });
      } else {
        res.json({ status: 'Wrong password' });
      }
    }
    // If user not found then
    else {
      res.json('No records found! ');
    }
  });
});

app.listen(3001, () => {
  console.log('Server listining on http://127.0.0.1:3001');
});
