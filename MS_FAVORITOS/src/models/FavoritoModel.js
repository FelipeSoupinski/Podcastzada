const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Favorito extends Model {}

Favorito.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    episodio_id: DataTypes.INTEGER,
    usuario_id: DataTypes.INTEGER
}, {
    sequelize, 
    modelName: 'Favorito',
    timestamps: true,   
});

(async () => await Favorito.sync())();

module.exports = Favorito;