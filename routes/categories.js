var express = require('express');
var router = express.Router();
const categoriesController = require('../controllers/categoriesControler');

/* GET users listing. */
router.get('/', categoriesController.getAll);

router.post('/', categoriesController.create);

router.delete('/:id', categoriesController.delete);

module.exports = router;
 