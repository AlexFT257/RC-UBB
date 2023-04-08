import { ApolloServer, AuthenticationError, UserInputError, gql  } from "apollo-server";
import './db.js'
import Asignatura from "./models/asignatura.js"
import Carrera from "./models/carrera.js"
import Chat from './models/chat.js'
import Comentario from "./models/comentario.js"
import Grupo from './models/grupo.js'
import Imagen_chat from "./models/imagen_chat.js"
import Me_gusta from "./models/me_gusta.js"
import Mensaje from './models/mensaje.js'
import Opcion from './models/opcion.js'
import Publicacion from './models/publicacion.js'
import Usuario from './models/usuario.js'
import Votacion from './models/votacion.js'
import jwt from 'jsonwebtoken'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET

const typeDefinitions = gql`

    type Usuario {
        id: ID!
        nombre: String!
        apellido: String!
        rut: String!
        email: String!
        fecha_nacimiento: Date!
        carrera: [Carrera]!
        asignaturas: [Asignatura]!
        estado: String!
        grupos: [Grupo]
        rol: String
        amigos: [Usuario]
        publicaciones: [Publicacion]
        me_gusta: [me_gusta]
        comentarios: [Comentario]
    }

    type Carrera {
        id: ID!
        nombre: String!
        acronimo: String!
        asignaturas: [Asignatura]
    }

    type Asignatura {
        id: ID!
        cod_asignatura: String!
        nombre: String!
        semestre: String!
        prof_encargado: String!
        cupos: Int!
        alumnos: [Usuario]
    }

    type Tipo_publicacion {
        imagen: Boolean!
        texto: Boolean!
        votacion: Boolean!
    }

    type Publicacion {
        id: ID!
        usuario: [Usuario]!
        hora: Date!
        tipo: [Tipo_publicacion]!
        imagen_url: String
        texto: String
        votaciones: [Votacion]
        comentarios: [Comentario]
        me_gusta: [Me_gusta]
    }

    type Me_gusta {
        id: ID!
        tipo : [tipo_megusta]!
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
        hora: Date!
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
        hora: Date!
        texto: String
        visto: [Usuario]
    }

    type Mensaje {
        id: ID!
        hora: Date!
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
        logear(email: String!, password: String!): [Usuario]!
        registrar(nombre: String!, apellido: String!, rut: String!, email: String!, password: String!, fecha_nacimiento: Date!, carrera: String!, asignaturas: [String]!): [Usuario]!
        crear_grupo(nombre: String!, descripcion: String!, admin: String!): [Grupo]!
        agregar_miembro_grupo(id_grupo: String!, id_usuario: String!): [Usuario]!
        agregar_amigo(id_usuario: String!, id_amigo: String!): [Usuario]!
        aceptar_amigo(id_usuario: String!, id_amigo: String!): [Usuario]!
        rechazar_amigo(id_usuario: String!, id_amigo: String!): [Usuario]!
        crear_publicacion(usuario: String!, tipo: String!, imagen_url: String, texto: String, votaciones: [String]): [publicacion]!
        crear_comentario(usuario: String!, texto: String!, hora: Date!, publicacion: String!, comentario: String!): [Comentario]!
        crear_megusta(usuario: String!, tipo: String!, publicacion: String!, comentario: String!): [Me_gusta]!
        crear_votacion(usuario: String!, pregunta: String!, opciones: [String]): [Votacion]!
        crear_opcion(texto: String!, votos: [String]): [Opcion]!
        crear_mensaje(usuario: String!, texto: String!, hora: Date!, chat: String!): [Mensaje]!
        crear_imagen_chat(usuario: String!, url: String!, hora: Date!, texto: String!, visto: [String]): [Imagen_chat]!
        crear_carrera(nombre: String!, acronimo: String!): [Carrera]!
    }

`

const resolvers = {
    Query: {

    },
    Mutation: {

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
