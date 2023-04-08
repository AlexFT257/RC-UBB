import mongoose from "mongoose"

const schema = new mongoose.Schema({
    usuario: [
        {
            required: true,
            ref: "Usuario",
            type: mongoose.Schema.Types.ObjectId
        }
    ],
    texto: {
        type: String,
        required: true
    },
    hora: {
        type: Date,
        required: true
    },
    me_gusta: [
        {
            ref: "Usuario",
            type: mongoose.Schema.Types.ObjectId
        }
    ],
    comentario:[
        {
            ref: "Comentario",
            type: mongoose.Schema.Types.ObjectId
        }
    ]

})

export default mongoose.model("Comentario", schema)