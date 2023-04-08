import mongoose from "mongoose"

const schema = new mongoose.Schema({
    imagen_url:{
        type: String
    },
    mensajes: [
        {
            ref: "Mensaje",
            type: mongoose.Schema.Types.ObjectId
        }
    ]
})

export default mongoose.model("Chat", schema)