const mongoose = require("mongoose");

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

module.exports = mongoose.model("Mensaje", schema);
