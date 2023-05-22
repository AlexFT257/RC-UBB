const { gql } = require('apollo-server');


const typeDefs = gql`
type Mutation {
    #Usuario
    crearUsuario(nombre: String!, apellido: String!, foto_perfil: String, username: String!, correo: String!, fecha_nacimiento: Date, chats: [ID], carrera: ID!, grupos: [ID], amigos: [ID], publicaciones: [ID], likes: [ID], comentarios: [ID]): Usuario
    editarUsuario(id: ID!, nombre: String!, apellido: String!, foto_perfil: String, username: String!, correo: String!, fecha_nacimiento: Date, chats: [ID], carrera: ID!, grupos: [ID], amigos: [ID], publicaciones: [ID], likes: [ID], comentarios: [ID]): Usuario
    eliminarUsuario(id: ID!): Usuario
    
    #Carrera
    crearCarrera(nombre: String!, acronimo: String!, alumnos: [ID]): Carrera
    editarCarrera(id: ID!, nombre: String, acronimo: String, alumnos: [ID!]): Carrera
    eliminarCarrera(id: ID!): Carrera

    #Publicación
    
    crearPublicacion(usuario: ID!, fecha: Date!, texto: String, imagenes: [String], votacion: VotacionInput, comentarios:[ID], likes: [ID]): Publicacion
    editarPublicacion(id: ID!, usuario: ID!, fecha: Date!, texto: String, imagenes: [String], votacion: VotacionInput, comentarios:[ID], likes: [ID]): Publicacion
    eliminarPublicacion(id: ID!): Publicacion
  
    # Crear Votación
    crearVotacion(pregunta: String!, opciones: [OpcionInput]!): Votacion
    editarVotacion(id: ID!, pregunta: String, opciones: [OpcionInput]): Votacion
    eliminarVotacion(id: ID!): Votacion
  
    # Crear Grupo
    crearGrupo(nombre: String!, privacidad: String!, vencimiento: Date, descripcion: String, admins: [ID]!, miembros: [ID]): Grupo
    editarGrupo(id: ID!, nombre: String, privacidad: String, vencimiento: Date, descripcion: String, admins: [ID], miembros: [ID]): Grupo
    eliminarGrupo(id: ID!): Grupo
  
    # Crear Chat
    crearChat(usuarios: [ID]!, nombre: String!, mensajes: [ID]): Chat
    eliminarChat(id: ID!): Chat
    addMensaje(id: ID!, mensaje: MensajeInput!): Chat
    addUsuariosToChat(id: ID!, usuarios: [ID!]): Chat

    # Crear Mensaje
    crearMensaje(chat: ID!, usuario: ID!, texto: String, imagenes: [String]): Mensaje
    editarMensaje(id: ID!, usuario: ID!, texto: String, imagenes: [String]): Mensaje
    eliminarMensaje(id: ID!): Mensaje
  }
`
module.exports = typeDefs;
