const Episodio = require('../models/EpisodioModel');

exports.create = async (req, res) => {
    try {
        const {
            titulo, descricao, arquivo, canal_id
        } = req.body;
        
        const episodio = await Episodio.create({ titulo, descricao, arquivo, canal_id });

        res.send({
            message: "Episodio cadastrado com sucesso.",
            episodio
        });
    } catch (error) {
        return res.status(500).send({
            error
        });
    }
}

exports.index = async (req, res) => {
    try {
        const episodios = await Episodio.findAll({
            where: {
                deletedAt: null
            }
        });
        return res.send(episodios);
    } catch (error) {
        return res.status(500).send({
            error
        });
    }
}

exports.show = async (req, res) => {
    try {
        const episodio = await Episodio.findByPk(req.params.id);
        return res.send(episodio);
    } catch (error) {
        return res.status(500).send({
            error
        });
    }
}

exports.update = async (req, res) => {
    try {
        const {
            titulo, descricao, arquivo, canal_id
        } = req.body;

        const episodio = await Episodio.findByPk(req.params.id);

        await episodio.update({
            titulo, descricao, arquivo, canal_id
        });

        res.send({
            message: "Episodio atualizado com sucesso."
        });
    } catch (error) {
        return res.status(500).send({
            error
        });
    }
}

exports.destroy = async (req, res) => {
    try {
        const episodio = await Episodio.findByPk(req.params.id);

        await episodio.update({
            deletedAt: new Date()
        });

        res.send({
            message: "Episodio deletado com sucesso."
        });
    } catch (error) {
        return res.status(500).send({
            error
        });
    }
}
