const router = require('express').Router();
const EstatisticaController = require('../controllers/EstatisticaController');
const auth = require('../middleware/auth');

router.post('/', auth, EstatisticaController.create);
router.get('/', auth, EstatisticaController.index);
router.get('/:id', auth, EstatisticaController.show);
router.put('/:id', auth, EstatisticaController.update);
router.delete('/:id', auth, EstatisticaController.destroy);

module.exports = router;
