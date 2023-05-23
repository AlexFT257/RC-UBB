const mongoose = require('mongoose')

const Usuario = require('./models/usuario')
const Carrera = require('./models/carrera')
const Publicacion = require('./models/publicacion')
const Votacion = require('./models/votacion')
const Grupo = require('./models/grupo')
const Chat = require('./models/chat')

const dotenv = require('dotenv')
dotenv.config()

// Conexión a la base de datos MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// Función para crear elementos de prueba
async function crearElementosDePrueba () {
  try {
    // Crear una carrera
    const carrera = new Carrera({
      nombre: 'Informática',
      acronimo: 'INFO'
    })

    const carrera1 = new Carrera({
      nombre: 'Administración de Empresas',
      acronimo: 'ADM'
    })

    // Crear un usuario
    const usuario = new Usuario({
      nombre: 'John',
      apellido: 'Doe',
      foto_perfil: 'profile.jpg',
      username: 'johndoe',
      correo: 'john@example.com',
      fecha_nacimiento: new Date()
    })

    // Crear un usuario
    const usuario1 = new Usuario({
      nombre: 'Jane',
      apellido: 'Smith',
      foto_perfil: 'profile.jpg',
      username: 'janesmith',
      correo: 'jane@example.com',
      fecha_nacimiento: new Date()
    })

    const grupo = new Grupo({
      nombre: 'Grupo de Estudio',
      privacidad: 'Público'
    })

    const grupo1 = new Grupo({
      nombre: 'Lenguaje',
      privacidad: 'Privado'
    })

    const publicacion = new Publicacion({
      usuario: usuario1.id,
      fecha: new Date(),
      texto: '¡Hola mundo!'
    })

    const publicacion1 = new Publicacion({
      usuario: usuario.id,
      fecha: new Date(),
      texto: '¡Saludos!'
    })

    // Generar elementos de prueba para Chat
    const chat1 = new Chat({
      usuarios: [usuario1, usuario]
    })

    const chat2 = new Chat({
      usuarios: [usuario, usuario1]
    })

    usuario.carrera = carrera
    usuario1.carrera = carrera1

    usuario.grupos.push(grupo)
    grupo.admins.push(usuario)
    grupo.chat = chat1;

    usuario1.grupos.push(grupo1)
    grupo1.admins.push(usuario1)
    grupo1.chat = chat2;
    
    await carrera.save()
    await carrera1.save()

    await usuario.save()
    await usuario1.save()
    await chat1.save();
    await chat2.save();

    await grupo.save()
    await grupo1.save()

    await publicacion.save()
    await publicacion1.save()

    console.log('Elementos de prueba creados correctamente.')
  } catch (error) {
    console.error('Error al crear elementos de prueba:', error)
  } finally {
    mongoose.disconnect()
  }
}

// Llamar a la función para crear los elementos de prueba
crearElementosDePrueba()
