import mongoose from "mongoose"

const schema = new mongoose.Schema({
    usuario: [
        {
            required: true,
            ref: "Usuario",
            type: mongoose.Schema.Types.ObjectId
        }
    ],
    url: {
        type: String,
        required: true
    },
    hora: {
        type: Date,
        required: true
    },
    texto: {
        type: String
    }
})

export default mongoose.model("Imagen_chat", schema)