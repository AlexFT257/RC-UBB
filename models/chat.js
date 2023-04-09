const mongoose = require("mongoose");

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

module.exports = mongoose.model("Chat", schema);
