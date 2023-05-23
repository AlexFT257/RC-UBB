const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const schema = new mongoose.Schema({
    dia: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 10,
        enum: [
            'Lunes',
            'Martes',
            'Miercoles',
            'Jueves',
            'Viernes',
            'Sabado',
        ]
    },
    hora_inicio: {
        type: Date,
        required: true,
        minlength: 3
    },
    hora_termino: {
        type: Date,
        required: true,
        minlength: 3
    },
    asignatura: {
        type: String,
        required: true,
        minlength: 3
    },
    sala: {
        type: String,
        required: true,
        minlength: 3
    },
    acronimo: {
        type: String,
        minlength: 2
    },
    usuario:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    }

});





schema.plugin(uniqueValidator);
module.exports = mongoose.model('Horario', schema);