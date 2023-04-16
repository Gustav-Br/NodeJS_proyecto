const mongoose = require("../config/mongodb")

const productSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, "el campo es obligatorio"],
        minLength: [3, "name debe contener al menos 3 letras"]
    },
    price:{
        type: Number,
        required: [true, "el campo es obligatorio"],
        min: [0, "el precio debe ser mayor a 0"]
    },
    description:String,
    quantity:Number
})

module.exports = mongoose.model("productos", productSchema)
