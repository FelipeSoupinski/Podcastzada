const Canal = require('../models/CanalModel');

exports.create = async (req, res) => {
    try {
        const {
            nome, categoria, descricao, imagem, usuario_id
        } = req.body;

        const hasCanal = await Canal.findOne({
            where: {
                usuario_id: usuario_id
            },
        });

        if (hasCanal) {
            res.status(401).send({
                message: "Este usuário já possui um canal."
            });
        }
        
        const canal = await Canal.create({ nome, categoria, descricao, imagem, usuario_id });

        res.send({
            message: "Canal cadastrado com sucesso.",
            canal
        });
    } catch (error) {
        return res.status(500).send({
            error
        });
    }
}

exports.index = async (req, res) => {
    try {
        const canais = await Canal.findAll({
            where: {
                deletedAt: null
            }
        });
        return res.send(canais);
    } catch (error) {
        return res.status(500).send({
            error
        });
    }
}

exports.show = async (req, res) => {
    try {
        const canal = await Canal.findById(req.params.id);
        return res.send(canal);
    } catch (error) {
        return res.status(500).send({
            error
        });
    }
}

exports.update = async (req, res) => {
    try {
        const {
            nome, categoria, descricao, imagem, usuario_id
        } = req.body;

        const canal = await Canal.findById(req.params.id);

        await canal.update({
            nome, categoria, descricao, imagem, usuario_id
        });

        res.send({
            message: "Canal atualizado com sucesso."
        });
    } catch (error) {
        return res.status(500).send({
            error
        });
    }
}

exports.destroy = async (req, res) => {
    try {
        const canal = await Canal.findById(req.params.id);

        await canal.update({
            deletedAt: new Date()
        });

        res.send({
            message: "Canal deletado com sucesso."
        });
    } catch (error) {
        return res.status(500).send({
            error
        });
    }
}
