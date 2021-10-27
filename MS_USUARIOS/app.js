require('dotenv').config();
const cors = require('cors');
const express = require('express');
const UsuariosRoutes = require('./src/routes/UsuariosRoutes');
const LoginRoute = require('./src/routes/LoginRoute');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use('/usuarios', UsuariosRoutes);
app.use('/login', LoginRoute);

module.exports = app;