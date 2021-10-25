const router = require('express').Router();
const CanalController = require('../controllers/CanalController');
const auth = require('../middleware/auth');

router.post('/', auth, CanalController.create);
router.get('/', auth, CanalController.index);
router.get('/:id', auth, CanalController.show);
router.put('/:id', auth, CanalController.update);
router.delete('/:id', auth, CanalController.destroy);

module.exports = router;
