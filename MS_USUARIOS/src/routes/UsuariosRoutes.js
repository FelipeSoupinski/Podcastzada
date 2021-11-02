const router = require('express').Router();
const UsuarioController = require('../controllers/UsuarioController');
const auth = require('../middleware/auth');

router.post('/hash', auth, UsuarioController.hashPassword);
router.post('/', UsuarioController.create);
router.get('/', auth, UsuarioController.index);
router.get('/:id', auth, UsuarioController.show);
router.put('/:id', auth, UsuarioController.update);
router.delete('/:id', auth, UsuarioController.destroy);

module.exports = router;
