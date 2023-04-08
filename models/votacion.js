import mongoose from "mongoose"
import uniqueValidator from "mongoose-unique-validator"

const schema = new mongoose.Schema({
    publicacion: [
        {
            ref: "Publicacion",
            type: mongoose.Schema.Types.ObjectId
        }
    ],
    creador: [
        {
            ref: "Usuario",
            type: mongoose.Schema.Types.ObjectId
        }
    ],
    pregunta: {
        type: String,
        required: true
    },
    opciones: [
        {
            ref: "Opcion",
            type: mongoose.Schema.Types.ObjectId
        }
    ]
})

schema.plugin(uniqueValidator)
export default mongoose.model("Votacion", schema)