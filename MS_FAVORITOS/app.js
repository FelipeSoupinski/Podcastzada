require('dotenv').config();
const cors = require('cors');
const express = require('express');
const FavoritosRoutes = require('./src/routes/FavoritosRoutes');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use('/favoritos', FavoritosRoutes);

module.exports = app;