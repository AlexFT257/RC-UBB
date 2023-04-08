import mongoose from "mongoose"
import uniqueValidator from "mongoose-unique-validator"

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
    rut: {
        type: String,
        required: true,
        unique: true,
        minlength: 7
    },
    correo: {
        type: String,
        required: true,
        unique: true,
        minlength: 7
    },
    fecha_nacimiento: {
        type: Date,
        required: true,
        min: "1970-01-01"
    },
    carrera: [
        {
            ref: "Carrera",
            type: mongoose.Schema.Types.ObjectId
        }
    ],
    asignaturas: [
        {
            ref: "Asignatura",
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
        required: true
    },
    amigos: {
        required: true
    },
    publicaciones: {
        required: true
    },
    me_gusta: {
        required: true
    },
    comentarios: {
        type: Array,
        required: true
    }
})

schema.plugin(uniqueValidator)
export default mongoose.model("Usuario", schema)