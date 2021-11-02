const Estatistica = require('../models/EstatisticaModel');

exports.create = async (req, res) => {
    try {
        const {
            nome, total_ouvintes, horas_reproduzidas, canal_id
        } = req.body;
        
        const estatistica = await Estatistica.create({ 
            nome, total_ouvintes, horas_reproduzidas, canal_id
        });

        res.send({
            message: "Estatistica adicionada com sucesso.",
            estatistica
        });
    } catch (error) {
        return res.status(500).send({
            error
        });
    }
}

exports.index = async (req, res) => {
    try {
        const estatisticas = await Estatistica.findAll();
        return res.send(estatisticas);
    } catch (error) {
        return res.status(500).send({
            error
        });
    }
}

exports.show = async (req, res) => {
    try {
        const estatistica = await Estatistica.findByPk(req.params.id);
        return res.send(estatistica);
    } catch (error) {
        return res.status(500).send({
            error
        });
    }
}

exports.update = async (req, res) => {
    try {
        const {
            nome, total_ouvintes, horas_reproduzidas, canal_id
        } = req.body;

        const estatistica = await Estatistica.findByPk(req.params.id);

        await estatistica.update({
            nome, total_ouvintes, horas_reproduzidas, canal_id
        });

        res.send({
            message: "Estatistica atualizada com sucesso."
        });
    } catch (error) {
        return res.status(500).send({
            error
        });
    }
}

exports.destroy = async (req, res) => {
    try {
        await Estatistica.destroy({
            where: {
                id: req.params.id
            }
        });

        res.send({
            message: "Estatistica deletada com sucesso."
        });
    } catch (error) {
        return res.status(500).send({
            error
        });
    }
}
