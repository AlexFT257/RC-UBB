import mongoose from "mongoose"
import uniqueValidator from "mongoose-unique-validator"

const schema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        minlength: 3,
        unique: true
    },
    acronimo: {
        type: String,
        required: true,
    },
    asignaturas: [
        {
            ref: "Asignatura",
            type: mongoose.Schema.Types.ObjectId
        }
    ]
})

schema.plugin(uniqueValidator)
export default mongoose.model("Carrera", schema)