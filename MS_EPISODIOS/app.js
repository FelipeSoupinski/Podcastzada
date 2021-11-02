require('dotenv').config();
const cors = require('cors');
const express = require('express');
const EpisodiosRoutes = require('./src/routes/EpisodiosRoutes');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use('/episodios', EpisodiosRoutes);

module.exports = app;