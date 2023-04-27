const mongoose = require("../config/mongodb")
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: [true, "el campo es obligatorio"],
        minLength: [3, "name debe contener al menos 3 letras"]
    },
    email:{
        type: String,
        unique: [true, "el email ya existe"],
        required: [true, "el campo es obligatorio"],
        validate: {
            validator: function(val){
                return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val)
            },
            message: props => `${props.value} No es una direccion de email valida`
        }
    },
    password:{
        type: String,
        required: [true, "el campo es obligatorio"],
        minLength: [8, "password debe contener al menos 8 caracteres" ]
    }

});

//   Moviendo la encriptacion al modulo usersControler
// userSchema.pre("save", function(next){
//     this.password = bcrypt.hashSync(this.password, 10)
//     next()
// })

module.exports = mongoose.model("users", userSchema)
