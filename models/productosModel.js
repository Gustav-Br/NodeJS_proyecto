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
        min: [0, "el precio debe ser mayor a 0"],
        // Modificadores: modifica el valor a mostrar cuando lee ... 
        // get: function(value){         
        //     return value*1.10
        // }
    },
    description:String,
    sku:{
        type: String,
        required: [true, "el código es obligatorio"]
    },
    quantity: Number,
    category:{
        type: mongoose.Schema.ObjectId,
        ref: "categories",
        required: [true, "el campo es obligatorio"]
    },
    destacado: Boolean
})

productSchema.set("toJSON",{getters:true, virtual:true})

// campo virtual solo para mostrar, no existe en la base de datos
productSchema.virtual("price_currency").get(function(){
    return `$ ${this.price}`
})


module.exports = mongoose.model("productos", productSchema)
