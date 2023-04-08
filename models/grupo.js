import mongoose from "mongoose"

const schema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        minlength: 3
    },
    descripcion: {
        type: String,
    },
    chat:[
        {
            required: true,
            ref: "Chat",
            type: mongoose.Schema.Types.ObjectId
        }
    ],
    admin: [
        {
            required: true,
            ref: "Usuario",
            type: mongoose.Schema.Types.ObjectId
        }
    ],
    miembros: [
        {
            ref: "Usuario",
            type: mongoose.Schema.Types.ObjectId
        }
    ]
})

export default mongoose.model("Grupo", schema)
