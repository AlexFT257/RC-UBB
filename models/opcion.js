import mongoose from "mongoose"
import uniqueValidator from "mongoose-unique-validator"

const schema = new mongoose.Schema({
    texto: {
        type: String,
        required: true,
        unique: true
    },
    votos: [
        {
            ref: "Usuario",
            type: mongoose.Schema.Types.ObjectId
        }
    ]
})

schema.plugin(uniqueValidator)
export default mongoose.model("Opcion", schema)