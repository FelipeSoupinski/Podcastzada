const Usuario = require('../models/UsuarioModel');
const bcrypt = require('bcrypt');

exports.create = async (req, res) => {
    try {
        const {
            nome, email, senha, nascimento, imagem
        } = req.body;
        
        const senhaHash = await bcrypt.hash(senha, 10);

        const usuario = await Usuario.create({ nome, email, senha: senhaHash, nascimento, imagem });

        res.send({
            message: "Usuario cadastrado com sucesso.",
            usuario
        });
    } catch (error) {
        return res.status(500).send({
            error
        });
    }
}

exports.index = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({
            where: {
                deletedAt: null
            }
        });
        return res.send(usuarios);
    } catch (error) {
        return res.status(500).send({
            error
        });
    }
}

exports.show = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        return res.send(usuario);
    } catch (error) {
        return res.status(500).send({
            error
        });
    }
}

exports.update = async (req, res) => {
    try {
        const {
            email, senha
        } = req.body;

        const usuario = await Usuario.findByPk(req.params.id);

        if(email) {
            await usuario.update({
                email
            });
        }

        if(senha) {
            await usuario.update({
                senha
            });
        }

        res.send({
            message: "Usuario atualizado com sucesso."
        });
    } catch (error) {
        return res.status(500).send({
            error
        });
    }
}

exports.destroy = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);

        await usuario.update({
            deletedAt: new Date()
        });

        res.send({
            message: "Usuario deletado com sucesso."
        });
    } catch (error) {
        return res.status(500).send({
            error
        });
    }
}
