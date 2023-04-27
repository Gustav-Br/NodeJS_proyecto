var express = require('express');
var router = express.Router();
const productosController = require('../controllers/productosController');

// devuelve todos los productos 
router.get('/', productosController.getAll);
//  devuelve solo los  destacados
router.get('/destacados', productosController.getFeatured);
// devuelve por Id
router.get('/:id', productosController.getById);
// crear un producto, requiere token 
router.post('/', (req,res,next)=>req.app.verifyToken(req,res,next), productosController.create);
// modificar un producto, requiere Id y token 
router.put('/:id', (req,res,next)=>req.app.verifyToken(req,res,next), productosController.update);
// eliminar un producto, requiere Id y token 
router.delete('/:id', (req,res,next)=>req.app.verifyToken(req,res,next), productosController.delete);

module.exports = router;
 