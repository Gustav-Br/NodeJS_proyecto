const productosModel = require("../models/productosModel")

module.exports = {
    getAll: async function(req, res, next) {
      try{
         const document = await productosModel.find().populate("category")
         res.status(200).json(document)
      }catch(e){
          console.log(`error: ${e}`)
          res.satus(400).json({error: e.message})
      }
    },

    getFeatured: async function(req, res, next) {
      try{
         const document = await productosModel.find({destacado:true}).populate("category")
         res.status(200).json(document)
      }catch(e){
          console.log(`error: ${e}`)
          res.satus(400).json({error: e.message})
      }
    },

    getById: async function(req, res, next) {
      try{
          const document = await productosModel.findById(req.params.id)
          res.json(document)
      }catch(e){
        console.log(`error: ${e}`);
      }
    },  

    create: async function(req, res, next) {
      try{
          const document = new productosModel({
              name: req.body.name,
              price: req.body.price,
              description: req.body.description,
              sku: req.body.sku,
              quantity: req.body.quantity,
              category: req.body.category,
              destacado: req.body.destacado || false
          })
          const producto = await document.save()
          res.status(201).json(producto)
      }catch(e){
          console.log(e);
          res.status(400).json({error: e.message})
      }
    },  

    update: async function(req, res, next) {
      try{
        const update = await productosModel.updateOne({_id:req.params.id}, req.body)
        res.status(200).json(update)
     }catch(e){
         console.log(`error: ${e}`);
     }
    },

    delete: async function(req, res, next) {
      try{
        const deleteReg = await productosModel.deleteOne({_id:req.params.id})
        res.status(200).json(deleteReg)
     }catch(e){
         console.log(`error: ${e}`);
     }
    }  
}