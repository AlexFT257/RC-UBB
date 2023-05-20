const { ApolloServer, AuthenticationError, UserInputError, gql } = require('apollo-server');
require('./db.js')
const Carrera = require('./models/carrera.js');
const Chat = require('./models/chat.js');
const Comentario = require('./models/comentario.js');
const Grupo = require('./models/grupo.js');
const Imagen_chat = require('./models/imagen_chat.js');
const Me_gusta = require('./models/me_gusta.js');
const Mensaje = require('./models/mensaje.js');
const Opcion = require('./models/opcion.js');
const Publicacion = require('./models/publicacion.js');
const Usuario = require('./models/usuario.js');
const Votacion = require('./models/votacion.js');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const app = express();
const Horario = require("./models/horario.js");
const enviarCorreo = require("./enviarCorreo.js");


app.use(cors());

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const typeDefinitions = gql`
  scalar Date

  type Usuario {
    id: ID!
    nombre: String!
    apellido: String!
    rut: String!
    correo: String!
    fecha_nacimiento: Date!
    carrera: [Carrera]!
    estado: String!
    grupos: [Grupo]
    rol: String
    amigos: [Usuario]
    publicaciones: [Publicacion]
    me_gusta: [Me_gusta]
    comentarios: [Comentario]
    horarios: [Horario]
    foto_perfil: String!
  }

  type Carrera {
    id: ID!
    nombre: String!
    acronimo: String!
  }

  type Tipo_publicacion {
    imagen: Boolean!
    texto: Boolean!
    votacion: Boolean!
  }

  type Publicacion {
    id: ID!
    usuario: [Usuario]!
    #hora: Date!
    tipo: [Tipo_publicacion]!
    imagen_url: String
    texto: String
    votaciones: [Votacion]
    comentarios: [Comentario]
    me_gusta: [Me_gusta]
  }

  type Me_gusta {
    id: ID!
    tipo: [Tipo_megusta]!
    publicacion: [Publicacion]
    comentario: [Comentario]
  }

  type Tipo_megusta {
    publicacion: Boolean!
    comentario: Boolean!
  }

  type Votacion {
    id: ID!
    publicacion: [Publicacion]!
    creador: [Usuario]!
    pregunta: String!
    opciones: [Opcion]!
  }

  type Opcion {
    id: ID!
    texto: String!
    votos: [Usuario]
  }

  type Comentario {
    id: ID!
    usuario: [Usuario]!
    texto: String!
    #hora: Date!
    me_gusta: [Me_gusta]
    comentarios: [Comentario]
  }

  type Grupo {
    id: ID!
    nombre: String!
    descripcion: String
    chat: [Chat]!
    admin: [Usuario]!
    miembros: [Usuario]!
  }

  type Chat {
    id: ID!
    Imagen_chat: [Imagen_chat]
    mensajes: [Mensaje]
  }

  type Imagen_chat {
    id: ID!
    Usuario: [Usuario]!
    url: String!
    #hora: Date!
    texto: String
    visto: [Usuario]
  }

  type Mensaje {
    id: ID!
    #hora: Date!
    usuario: [Usuario]!
    texto: String!
    visto: [Usuario]!
  }

  type Horario{
    id: ID!
    dia: String!
    hora_inicio: String!
    hora_termino: String!
    asignatura: String!
    sala: String!
    acronimo: String
    usuario: [Usuario]!
  }


  type Query {
    all_carreras: [Carrera]!
    all_usuarios: [Usuario]!
    all_horarios: [Horario]!
    buscarUsuario(buscar: String!): [Usuario]
  }

  type Mutation {
    crearUsuario(
      nombre: String!
      apellido: String!
      rut: String!
      correo: String!
      fecha_nacimiento: Date
      carrera: String!
      estado: String!
      rol: String
      foto_perfil: String
    ): Usuario
    editarUsuario(
      id: ID!
      nombre: String!
      apellido: String!
      rut: String!
      email: String!
      carrera: String!
      estado: String!
      rol: String
    ): Usuario
    eliminarUsuario(id: ID!): Usuario
    crearCarrera(nombre: String!, acronimo: String!): Carrera
    editarCarrera(id: ID!, nombre: String!, acronimo: String!): Carrera
    eliminarCarrera(id: ID!): Carrera
    crearHorario(dia: String!, hora_inicio: String!, hora_termino: String!,asignatura:String!, sala:String!,acronimo:String!, usuario:String!): Horario
    subirFotoPerfil(id: ID!, foto_perfil: String!): Usuario
}
 

 

`;

const resolvers = {
    Query: {
        all_carreras: () => Carrera,
        all_usuarios: () => Usuario,
        all_horarios: () => Horario,
        buscarUsuario: async (root, args) => {
            if(await Usuario.find({ $or: [
                { nombre: { $regex: args.buscar, $options: 'i' } },
                { apellido: { $regex: args.buscar, $options: 'i' } },
                { nombre_usuario: { $regex: args.buscar, $options: 'i' } },
            ] }).length == 0){
                return null;
            }
            else{
                const usuario = await Usuario.find({
                    $or: [
                        { nombre: { $regex: args.buscar, $options: 'i' } },
                        { apellido: { $regex: args.buscar, $options: 'i' } },
                        { nombre_usuario: { $regex: args.buscar, $options: 'i' } },
                    ]
            });
            return usuario;}
        },
    },
    Mutation: {
        crearUsuario: async (root, args) => {
            const usuario = new Usuario({ ...args });
            try {
                await usuario.save();
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                });
            }
        },
        editarUsuario: async (root, args) => {
            const usuario = await Usuario.findOne({ rut: args.rut });
            if (!usuario) {
                return null;
            }
            usuario = new Usuario({ ...args });
            try {
                await usuario.save();
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                });
            }
        },
        eliminarUsuario: async (root, args) => {
            const usuario = await Usuario.findOne({ rut: args.rut });
            try {
                await Usuario.deleteOne({ rut: args.rut });
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                });
            }
        },
        crearCarrera: async (root, args) => {
            try {
                const carrera = new Carrera({ ...args });
                const savedCarrera = await carrera.save();
                return savedCarrera;
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                });
            }
        },
        editarCarrera: async (root, args) => {
            const carrera = await Carrera.findOne({ acronimo: args.acronimo });
            if (!carrera) {
                return null;
            }
            carrera = new Carrera({ ...args });
            try {
                await carrera.save();
            } catch (error) {
                throw new UsuarioInputError(error.message, {
                    invalidArgs: args,
                });
            }
        },
        eliminarCarrera: async (root, args) => {
            const carrera = await Carrera.findOne({ acronimo: args.acronimo });
            try {
                await Carrera.deleteOne({ acronimo: args.acronimo });
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                });
            }
        },
        crearHorario: async (root, args) => {
            const horario = new Horario({ ...args });
            try {
                await horario.save();
                const usuario = await Usuario.findOne({ _id: args.usuario });
                await enviarCorreo(usuario, horario);
                return horario;
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                });
            }
        },
        subirFotoPerfil: async (root, args) => {
            const usuario = await Usuario.findOne({ _id: args.id });
            if (!usuario) {
                return null;
            }
            usuario.foto_perfil = args.foto_perfil;
            try {
                await usuario.save();
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                });
            }
        }

    },
    Tipo_publicacion: {},
    Tipo_megusta: {},
};

const server = new ApolloServer({
    typeDefs: typeDefinitions,
    resolvers//FALTA EL METODO DE INICIO DE SESION
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})

