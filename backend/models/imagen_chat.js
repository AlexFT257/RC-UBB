const mongoose = require("mongoose");

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

module.exports = mongoose.model("Imagen_chat", schema);
