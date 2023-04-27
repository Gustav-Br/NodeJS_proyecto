var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController');
/* GET users listing. */

router.get('/', usersController.getAll);

router.post('/alta', usersController.create);

router.post('/login', usersController.validate);

router.delete('/:id', (req,res,next)=>req.app.verifyToken(req,res,next), usersController.delete);

// router.get('/', function(req, res, next) {
//   res.send('respond with a GSB UTN');
// });

module.exports = router;
 