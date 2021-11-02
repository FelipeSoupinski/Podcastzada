const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Episodio extends Model {}

Episodio.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    titulo: DataTypes.STRING,
    descricao: DataTypes.STRING,
    imagem: DataTypes.STRING,
    arquivo: DataTypes.STRING,
    canal_id: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
}, {
    sequelize, 
    modelName: 'Episodio',
    timestamps: true,   
});

(async () => await Episodio.sync())();

module.exports = Episodio;