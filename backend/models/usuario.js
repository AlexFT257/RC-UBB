const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  apellido: {
    type: String,
    required: true
  },
  foto_perfil: {
    type: String
},
  username: {
    type: String,
        required: true,
        unique: true,
        minlength: 3
  },
  correo: {
    type: String,
    required: true,
    unique: true,
    minlength: 7
  },
  contrasena: {
    type: String,
    required: true,
    minlength: 8
},
  fecha_nacimiento: {
    type: Date
  },
  chats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat'
    }
  ],
  carrera: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Carrera',
    required: true
  },
  grupos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Grupo'
    }
  ],
  amigos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario'
    }
  ],
  publicaciones: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Publicacion'
    }
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Publicacion'
    }
  ],
  comentarios: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Publicacion'
    }
  ],
  temporalKey: {
    type: String,
    
  },
})

schema.plugin(uniqueValidator)
module.exports = mongoose.model('Usuario', schema)
