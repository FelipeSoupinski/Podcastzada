const router = require('express').Router();
const FavoritoController = require('../controllers/FavoritoController');
const auth = require('../middleware/auth');

router.post('/', auth, FavoritoController.create);
router.get('/', auth, FavoritoController.index);
router.get('/:id', auth, FavoritoController.show);
router.put('/:id', auth, FavoritoController.update);
router.delete('/:id', auth, FavoritoController.destroy);

module.exports = router;
