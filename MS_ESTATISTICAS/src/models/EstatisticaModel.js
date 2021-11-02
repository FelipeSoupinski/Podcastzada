const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Estatistica extends Model {}

Estatistica.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: DataTypes.STRING,
    total_ouvintes: DataTypes.INTEGER,
    horas_reproduzidas: DataTypes.INTEGER,
    canal_id: DataTypes.INTEGER,
}, {
    sequelize, 
    modelName: 'Estatistica',
    timestamps: true,   
});

(async () => await Estatistica.sync())();

module.exports = Estatistica;