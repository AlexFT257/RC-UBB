const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

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
        unique: true
    }
})

schema.plugin(uniqueValidator)
module.exports = mongoose.model("Carrera", schema);
