const { gql } = require('apollo-server');

const typeDefs = gql`

type Query {
    #Carrera
    all_carreras: [Carrera]!
    buscarCarrera(id: ID!): [Carrera]
    #Chat
    all_chats: [Chat]!
    buscarChat(id: ID!): [Chat]
    #Comentario
    all_comentarios: [Comentario]!
    buscarComentarioId(id: ID!): [Comentario]
    buscarComentarioUsuario(usuario: ID!): [Comentario]
    buscarComentarioPublicacion(publicacion: ID!): [Comentario]
    buscarComentario(buscar: String!): [Comentario]
    #Grupo
    all_grupos: [Grupo]!
    buscarGrupo(buscar: String!): [Grupo]
    buscarGrupoId(id: ID!): [Grupo]
    buscarGrupoUsuario(usuario: ID!): [Grupo]
    buscarGrupoAdmin(admin: ID!): [Grupo]
    #Me_gusta
    all_meGusta: [Me_gusta]!
    buscarMeGustaId(id: ID!): [Me_gusta]
    buscarMeGustaTipo(tipo: String!): [Me_gusta]
    buscarMeGustaUsuario(usuario: ID!): [Me_gusta]
    buscarMeGustaPublicacion(publicacion: ID!): [Me_gusta]
    #Mensaje
    all_mensajes: [Mensaje]!
    buscarMensaje(buscar: String!): [Mensaje]
    buscarMensajeId(id: ID!): [Mensaje]
    buscarMensajeUsuario(usuario: ID!): [Mensaje]
    buscarMensajeHora(hora: Date!): [Mensaje]
    #Opcion
    all_opciones: [Opcion]!
    buscarOpcion(buscar: String!): [Opcion]
    buscarOpcionId(id: ID!): [Opcion]
    buscarOpcionUsuario(usuario: ID!): [Opcion]
    #Publicacion
    all_publicaciones: [Publicacion]!
    buscarPublicacion(buscar: String!): [Publicacion]
    buscarPublicacionId(id: ID!): [Publicacion]
    buscarPublicacionUsuario(usuario: ID!): [Publicacion]
    buscarPublicacionHora(hora: Date!): [Publicacion]
    #Usuario
    all_usuarios: [Usuario]!
    buscarUsuario(buscar: String!): [Usuario]
    buscarUsuarioId(id: ID!): [Usuario]
    buscarUsuarioCorreo(email: String!): [Usuario]
    buscarUsuarioFechaNacimiento(fecha_nacimiento: Date!): [Usuario]
    buscarUsuarioCarrera(carrera: ID!): [Usuario]
    buscarUsuarioEstado(estado: String!): [Usuario]
    buscarUsuarioRol(rol: String!): [Usuario]
    cantidadAmigosUsuario(id: ID!): Int!
    cantidadPublicacionesUsuario(id: ID!): Int!
    cantidadComentariosUsuario(id: ID!): Int!
    cantidadMeGustaUsuario(id: ID!): Int!
    #Votacion
    all_votaciones: [Votacion]!
    buscarVotacion(buscar: String!): [Votacion]
    buscarVotacionId(id: ID!): [Votacion]
    buscarVotacionUsuario(usuario: ID!): [Usuario]
    buscarVotacionPublicacion(publicacion: ID!): [Publicacion]
    #buscarVotacionResultados(id: ID!): [Votacion]
}
`

module.exports = typeDefs;
