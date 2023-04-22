const { gql } = require('apollo-server');

const typeDefs = gql`

type Mutation {
    #Usuario
    crearUsuario(nombre: String!, apellido: String!, nombre_usuario: String!, correo: String!, carrera: String!, estado: String!, rol: String): Usuario
    editarUsuario(id: ID!, nombre: String!, apellido: String!, nombre_usuario: String!, correo: String!, carrera: String!, estado: String!, rol: String): Usuario
    eliminarUsuario(id: ID!): Usuario
    #Carrera
    crearCarrera(nombre: String!, acronimo: String!): Carrera
    editarCarrera(id: ID!, nombre: String!, acronimo: String!): Carrera
    eliminarCarrera(id: ID!): Carrera
    #Publicacion
    crearPublicacion(usuario: ID!, hora: Date!, imagen_url: String, texto: String): Publicacion
    editarPublicacion(id: ID!, usuario: ID!, hora: Date!, imagen_url: String, texto: String): Publicacion
    eliminarPublicacion(id: ID!): Publicacion
    #Me_gusta
    crearMeGusta(tipo: String!, usuario: ID!, publicacion: ID): Me_gusta
    editarMeGusta(id: ID!, tipo: String!, usuario: ID!, publicacion: ID): Me_gusta
    eliminarMeGusta(id: ID!): Me_gusta
    #Votacion
    crearVotacion(publicacion: ID!, creador: ID!, pregunta: String!, opciones: [String]): Votacion
    editarVotacion(id: ID!, publicacion: ID!, creador: ID!, pregunta: String!, opciones: [String]): Votacion
    eliminarVotacion(id: ID!): Votacion
    #Opcion
    crearOpcion(texto: String!, votos: [ID]): Opcion
    editarOpcion(id: ID!, texto: String!, votos: [ID]): Opcion
    eliminarOpcion(id: ID!): Opcion
    #Comentario
    crearComentario(usuario: ID!, texto: String!, hora: Date!): Comentario
    editarComentario(id: ID!, usuario: ID!, texto: String!, hora: Date!): Comentario
    eliminarComentario(id: ID!): Comentario
    #Grupo
    crearGrupo(nombre: String!, descripcion: String, chat: ID!, admin: ID!, miembros: [ID]): Grupo
    editarGrupo(id: ID!, nombre: String!, descripcion: String, chat: ID!, admin: ID!, miembros: [ID]): Grupo
    eliminarGrupo(id: ID!): Grupo
    #Chat
    crearChat(mensajes: [ID]): Chat
    editarChat(id: ID!, mensajes: [ID]): Chat
    eliminarChat(id: ID!): Chat
    #Mensaje
    crearMensaje(hora: Date!, usuario: ID!, texto: String, imagen: String, visto: [ID]): Mensaje
    editarMensaje(id: ID!, hora: Date!, usuario: ID!, texto: String, imagen: String, visto: [ID]): Mensaje
    eliminarMensaje(id: ID!): Mensaje
}

`

module.exports = typeDefs;
