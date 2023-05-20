const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const schema = new mongoose.Schema({
    dia: {
        type: String,
        required: true,
        minlength: 3
    },
    hora_inicio: {
        type: String,
        required: true,
        minlength: 3
    },
    hora_termino: {
        type: String,
        required: true,
        minlength: 3
    },
    asignatura:{
        type: String,
        required: true,
        minlength: 3
    },
    sala:{
        type: String,
        required: true,
        minlength: 3
    },
    acronimo:{
        type: String,
        minlength: 1
    },
    usuario: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
        }
    ]
});





schema.plugin(uniqueValidator);
module.exports = mongoose.model('Horario', schema);