const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");


const schema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        minlength: 3
    },
    apellido: {
        type: String,
        required: true,
        minlength: 3
    },
    nombre_usuario: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    correo: {
        type: String,
        required: true,
        unique: true,
        minlength: 7
    },
    fecha_nacimiento: {
        type: Date,
        min: "1970-01-01"
    },
    carrera: [
        {
            ref: "Carrera",
            type: mongoose.Schema.Types.ObjectId
        }
    ],
    estado: {
        type: String,
        required: true
    },
    grupos: {
        type: Array,
        required: true
    },
    rol: {
        type: String,
        required: true
    },
    amigos: [
        {
            ref: "Usuario",
            type: mongoose.Schema.Types.ObjectId
        }
    ],
    publicaciones: [
        {
            ref: "Publicacion",
            type: mongoose.Schema.Types.ObjectId
        }
    ],
    me_gusta: [
        {
            ref: "Publicacion",
            type: mongoose.Schema.Types.ObjectId
        }
    ],
    comentarios: [
        {
            ref: "Comentario",
            type: mongoose.Schema.Types.ObjectId
        }
    ],
    imagen:{
        type: String
    }
})

schema.plugin(uniqueValidator)
module.exports = mongoose.model("Usuario", schema);
