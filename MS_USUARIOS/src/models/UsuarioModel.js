const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Usuario extends Model {}

Usuario.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    senha: DataTypes.STRING,
    nascimento: DataTypes.DATE,
    imagem: DataTypes.STRING,
    deletedAt: DataTypes.DATE
}, {
    sequelize, 
    modelName: 'Usuario',
    timestamps: true,   
});

(async () => await Usuario.sync())();

module.exports = Usuario;