require('dotenv').config();
const cors = require('cors');
const express = require('express');
const CanaisRoutes = require('./src/routes/CanaisRoutes');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use('/canais', CanaisRoutes);

module.exports = app;