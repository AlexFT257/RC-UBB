const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const schema = new mongoose.Schema({

    usuario:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    fecha:
    {
        type: Date,
        required: true,
        minlength: 3
    },
    descripcion:
    {
        type: String
    },
    tipo:
    {
        type: String,
        required: true,
        minlength: 2
    },
    id_elemento:
    {
        type: String,
        required: true,
        minlength: 2
    },
    titulo:
    {
        type: String,
        required: true,
        minlength: 2
    },
    estado:
    {
        type: String,
        minlength: 2,
        default: 'Pendiente'
    },
    resolucion:
    {
        type: String
    }

});

schema.plugin(uniqueValidator);
module.exports = mongoose.model('Reporte', schema);
