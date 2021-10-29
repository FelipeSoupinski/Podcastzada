const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.header('authorization')?.split(' ')[1];
        const decoded = jwt.verify(token, process.env.APP_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            message: 'Credenciais inválidas!'
        });
    }
};
