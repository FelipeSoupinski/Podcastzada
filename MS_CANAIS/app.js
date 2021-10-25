require('dotenv').config();
const express = require('express')
const CanaisRoutes = require('./src/routes/CanaisRoutes');
const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use('/canais', CanaisRoutes);

module.exports = app;