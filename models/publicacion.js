import mongoose from "mongoose"

const schema = new mongoose.Schema({
    usuario: [
        {
            ref: "Usuario",
            type: mongoose.Schema.Types.ObjectId
        }
    ],
    hora: {
        type: Date,
        required: true
    },
    imagen_url : {
        type: String
    },
    texto : {
        type: String
    },
    votaciones: [
        {
            ref: "Votacion",
            type: mongoose.Schema.Types.ObjectId
        }
    ],
    comentarios: [
        {
            ref: "Comentario",
            type: mongoose.Schema.Types.ObjectId
        }
    ],
    me_gusta: [
        {
            ref: "Usuario",
            type: mongoose.Schema.Types.ObjectId
        }
    ]
})

export default mongoose.model("Publicacion", schema)