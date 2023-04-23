const mongoose = require("mongoose");

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

module.exports = mongoose.model("Me_gusta", schema);
