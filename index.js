const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

const db = require('./queries');
const tk = require('./token');

app.use(cors())
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
});

app.get('/users', db.getUsers);
app.get('/users/:id', db.getUserById);
app.post('/users', db.createUser);
app.put('/users/:id', db.updateUser);
app.delete('/users/:id', db.deleteUser);

// Generating JWT
app.post("/user/generateToken", tk.generateToken);
// Verification of JWT
app.get("/user/validateToken", tk.validateToken);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});