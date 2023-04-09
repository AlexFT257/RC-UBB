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

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET
const typeDefinitions = gql`

    #scalar Date

    type Usuario {
        id: ID!
        nombre: String!
        apellido: String!
        rut: String!
        email: String!
        #fecha_nacimiento: Date!
        carrera: [Carrera]!
        estado: String!
        grupos: [Grupo]
        rol: String
        amigos: [Usuario]
        publicaciones: [Publicacion]
        me_gusta: [Me_gusta]
        comentarios: [Comentario]
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
        visto: [Usuario]
    }


    type Query {
        count_alumnos_carrera: Int!
        count_alumnos_asignatura: Int!
        count_publicaciones_usuario: Int!
        count_publicaciones_grupo: Int!
        count_comentarios_publicacion: Int!
        count_comentarios_comentario: Int!
        count_megusta_publicacion: Int!
        count_megusta_comentario: Int!
        count_votos_votacion: Int!
        count_votos_opcion: Int!
        count_mensajes_chat: Int!
        count_mensajes_usuario: Int!
        count_imagenes_chat: Int!
        count_imagenes_usuario: Int!
        count_grupos_usuario: Int!
        count_grupos_admin: Int!
        count_miembros_grupo: Int!
        count_amigos_usuario: Int!
        count_amigos_solicitud: Int!
        count_amigos_solicitud_enviada: Int!
        count_amigos_solicitud_recibida: Int!
        count_amigos_solicitud_aceptada: Int!
        count_amigos_solicitud_rechazada: Int!
    }

    type Mutation {
        crearUsuario(nombre: String!, apellido: String!, rut: String!, email: String!, carrera: String!, estado: String!, rol: String): Usuario
        editarUsuario(id: ID!, nombre: String!, apellido: String!, rut: String!, email: String!, carrera: String!, estado: String!, rol: String): Usuario
        eliminarUsuario(id: ID!): Usuario
        crearCarrera(nombre: String!, acronimo: String!): Carrera
        editarCarrera(id: ID!, nombre: String!, acronimo: String!): Carrera
        eliminarCarrera(id: ID!): Carrera
    }

`

const resolvers = {
    Query: {
        count_alumnos_carrera: () => Carrera.Usuario.countDocument(),
    },
    Mutation: {
        crearUsuario: async (_, { input }) => {
            try {
                const usuario = await Usuario.create(input);
                return usuario;
            } catch (error) {
                console.error(error);
                throw new Error("Error al crear usuario");
            }
        },
        editarUsuario: async (_, { id, input }) => {
            try {
                const usuario = await Usuario.findByIdAndUpdate(id, input, { new: true });
                if (!usuario) throw new Error("Usuario no encontrado");
                return usuario;
            } catch (error) {
                console.error(error);
                throw new Error("Error al editar usuario");
            }
        },
        eliminarUsuario: async (_, { id }) => {
            try {
                const usuario = await Usuario.findByIdAndDelete(id);
                if (!usuario) throw new Error("Usuario no encontrado");
                return usuario;
            } catch (error) {
                console.error(error);
                throw new Error("Error al eliminar usuario");
            }
        },
        crearCarrera: async (_, { input }) => {
            try {
                const carrera = await Carrera.create(input);
                return carrera;
            } catch (error) {
                console.error(error);
                throw new Error('Error al crear carrera');
            }
        },
        editarCarrera: async (_, { id, input }) => {
            try {
                const carrera = await Carrera.findByPk(id);
                if (!carrera) throw new Error('Carrera no encontrada');
                await carrera.update(input);
                return carrera;
            } catch (error) {
                console.error(error);
                throw new Error('Error al editar carrera');
            }
        },
        eliminarCarrera: async (_, { id }) => {
            try {
                const carrera = await Carrera.findByPk(id);
                if (!carrera) throw new Error('Carrera no encontrada');
                await carrera.destroy();
                return 'Carrera eliminada correctamente';
            } catch (error) {
                console.error(error);
                throw new Error('Error al eliminar carrera');
            }
        },
    },
    Tipo_publicacion: {

    },
    Tipo_megusta: {

    },

}

const server = new ApolloServer({
    typeDefs: typeDefinitions,
    resolvers//FALTA EL METODO DE INICIO DE SESION
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})
