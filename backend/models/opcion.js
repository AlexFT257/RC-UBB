const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

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
module.exports = mongoose.model("Opcion", schema);
