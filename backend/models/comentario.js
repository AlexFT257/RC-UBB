const mongoose = require("mongoose");

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

module.exports = mongoose.model("Comentario", schema);
