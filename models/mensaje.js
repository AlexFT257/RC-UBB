import mongoose from "mongoose"

const schema = new mongoose.Schema({
    hora: {
        type: Date,
        required: true
    },
    usuario:[
        {
            ref: "Usuario",
            type: mongoose.Schema.Types.ObjectId,
            required: true
        }
    ],
    texto: {
        type: String,
        required: true
    }
})

export default mongoose.model("Mensaje", schema)