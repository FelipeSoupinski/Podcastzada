const router = require('express').Router();

const CanalController = require('../controllers/CanalController');

router.post('/', CanalController.create);
router.get('/', CanalController.index);
router.get('/:id', CanalController.show);
router.put('/:id', CanalController.update);
router.delete('/:id', CanalController.destroy);

module.exports = router;
