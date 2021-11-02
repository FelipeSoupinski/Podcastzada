const Favorito = require('../models/FavoritoModel');

exports.create = async (req, res) => {
    try {
        const {
            episodio_id, usuario_id
        } = req.body;

        const hasFavorito = await Favorito.findOne({
            where: {
                usuario_id,
                episodio_id,
            },
        });

        if (hasFavorito) {
            res.status(400).send({
                message: "Episódio já adicionado aos favoritos."
            });
        }
        
        const favorito = await Favorito.create({ episodio_id, usuario_id });

        res.send({
            message: "Favorito adicionado com sucesso.",
            favorito
        });
    } catch (error) {
        return res.status(500).send({
            error
        });
    }
}

exports.index = async (req, res) => {
    try {
        const favoritos = await Favorito.findAll();
        return res.send(favoritos);
    } catch (error) {
        return res.status(500).send({
            error
        });
    }
}

exports.show = async (req, res) => {
    try {
        const favorito = await Favorito.findByPk(req.params.id);
        return res.send(favorito);
    } catch (error) {
        return res.status(500).send({
            error
        });
    }
}

exports.update = async (req, res) => {
    try {
        const {
            episodio_id, usuario_id
        } = req.body;

        const favorito = await Favorito.findByPk(req.params.id);

        await favorito.update({
            episodio_id, usuario_id
        });

        res.send({
            message: "Favorito atualizado com sucesso."
        });
    } catch (error) {
        return res.status(500).send({
            error
        });
    }
}

exports.destroy = async (req, res) => {
    try {
        const favorito = await Favorito.findOne({ where:{ usuario_id: req.params.id} });

        if (favorito.usuario_id != req.user.id) {
            res.status(401).send({
                message: "Somente o usuário pode apagar um favorito."
            });
        }

        await favorito.destroy();

        res.send({
            message: "Favorito deletado com sucesso."
        });
    } catch (error) {
        return res.status(500).send({
            error
        });
    }
}
