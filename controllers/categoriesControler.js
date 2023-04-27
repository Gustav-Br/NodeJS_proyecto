const categoriesModel = require("../models/categoriesModel")

module.exports = {

    getAll: async function(req, res, next){
        try{
            const document = await categoriesModel.find()
            res.status(200).json(document)
        }catch(e){
            console.log(`error: ${e}`)
          res.satus(400).json({error: e.message})
        }
    },

    create: async function(req, res, next) {
        try{
            const document = new categoriesModel({
                name: req.body.name
            })
            const producto = await document.save()
            res.status(201).json(producto)
        }catch(e){
            console.log(e);
            res.status(400).json({error: e.message})
        }
      },

      delete: async function(req, res, next) {
        try{
          const deleteReg = await categoriesModel.deleteOne({_id:req.params.id})
          res.status(200).json(deleteReg)
       }catch(e){
           console.log(`error: ${e}`);
       }
      }
}