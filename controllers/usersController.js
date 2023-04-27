const usersModel = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    getAll: async function(req, res, next) {
      try{
         const users = await usersModel.find()
         res.status(200).json(users)
      }catch(e){
          console.log(`error: ${e}`)
          res.satus(400).json({error: e.message})
      }
    },

    validate: async function(req, res, next) {
      try{
         const user = await usersModel.findOne({email:req.body.email})
         if(!user){
          res.status(401).json({message: "email y/o contraseña incorrectos"})
          return
         }
         if(bcrypt.compareSync(req.body.password, user.password)){
          const token = jwt.sign({userId:user._id},req.app.get("secretKey"),{expiresIn:'15m'})
          res.json(token)
         }else{
          res.status(401).json({message: "email y/o contraseña incorrectos"})
          return
         }
        }catch(e){
            console.log(`error: ${e}`)
            res.json({error: e.message})
        }
    },

    create: async function(req, res, next) {
      try{
        //  realiza la encriptacion del password antes de guardar en DB
          const hashPassword = bcrypt.hashSync(req.body.password, 10);
          const document = new usersModel({
              name: req.body.name,
              email: req.body.email,
              password: hashPassword
          });

          const user = await document.save()
          res.status(201).json(user)
      }catch(e){
          console.log(e);
          res.status(400).json({error: e.message})
      }
    },

    delete: async function(req, res, next) {
      try{
        const deleteReg = await usersModel.deleteOne({_id:req.params.id})
        res.status(200).json(deleteReg)
      }catch(e){
          console.log(`error: ${e}`);
      }
    }
}
