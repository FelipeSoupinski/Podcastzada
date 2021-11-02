const router = require('express').Router();
const EpisodioController = require('../controllers/EpisodioController');
const auth = require('../middleware/auth');

router.post('/', auth, EpisodioController.create);
router.get('/', auth, EpisodioController.index);
router.get('/:id', auth, EpisodioController.show);
router.put('/:id', auth, EpisodioController.update);
router.delete('/:id', auth, EpisodioController.destroy);

module.exports = router;
