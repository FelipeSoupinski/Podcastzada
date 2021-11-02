require('dotenv').config();
const cors = require('cors');
const express = require('express');
const EstatisticasRoutes = require('./src/routes/EstatisticasRoutes');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use('/estatisticas', EstatisticasRoutes);

module.exports = app;