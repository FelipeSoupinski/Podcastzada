const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Canal extends Model {}

Canal.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: DataTypes.STRING,
    categoria: DataTypes.STRING,
    descricao: DataTypes.STRING,
    imagem: DataTypes.STRING,
    usuario_id: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
}, {
    sequelize, 
    modelName: 'Canal',
    timestamps: true,   
});

(async () => await Canal.sync())();

module.exports = Canal;