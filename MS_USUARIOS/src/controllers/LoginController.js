const Usuario = require('../models/UsuarioModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    try {
        const {
            email, senha
        } = req.body;
        
        const usuario = await Usuario.findOne({
            where: {
                email: email
            }
        });

        if (!usuario) {
            return res.status(401).send({
                message: 'Email inválido'
            });
        }

        if (!await bcrypt.compare(senha, usuario.senha)) {
            return res.status(401).send({
                message: 'Senha inválida'
            });
        }

        const token = jwt.sign({
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
        }, process.env.APP_KEY);

        res.send({
            type: 'Bearer',
            token
        });
    } catch (error) {
        return res.status(500).send({
            error
        });
    }
}