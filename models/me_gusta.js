import mongoose from "mongoose"

const schema = new mongoose.Schema({
    Tipo: {
        type: String,
        required: true
    },
    publicacion: [
        {
            ref: "Publicacion",
            type: mongoose.Schema.Types.ObjectId
        }
    ],
    comentario: [
        {
            ref: "Comentario",
            type: mongoose.Schema.Types.ObjectId
        }
    ]
})

export default mongoose.model("Me_gusta", schema)