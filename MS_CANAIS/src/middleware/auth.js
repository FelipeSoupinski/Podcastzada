const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const decoded = jwt.verify(req.body.token, process.env.APP_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).send({
            message: 'Credenciais inválidas!'
        });
    }
};
