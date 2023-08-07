const { gql } = require('apollo-server');


const typeDefs = gql`
type Mutation {
    #Usuario
    crearUsuario(nombre: String!, apellido: String!, username: String!, correo: String!,contrasena:String!,fecha_nacimiento: Date, carrera: ID!): Usuario
    login(correo:String!, contrasena:String!): Token
    forgotPassword(correo: String!): ForgotPasswordResponse!
    verificarClaveTemporal(temporalKey: String!, correo: String!): Boolean!
    actualizarContrasena(correo: String!, temporalKey: String!, nuevaClave: String!): Boolean!
    editarUsuario(id: ID, nombre: String, apellido: String, correo: String, contrasena:String, carrera: ID,foto_perfil:String): Usuario
    eliminarUsuario(id: ID!): Usuario
    #calendario
    crearEvento(titulo: String!, fecha_inicio: Date!, fecha_fin: Date!, descripcion: String, usuario: ID!): calendario
    editarEvento(id: ID!, titulo: String!, fecha_inicio: Date!, fecha_fin: Date!, descripcion: String, usuario: ID!): calendario
    eliminarEvento(id: ID!): calendario
    #Carrera
    crearCarrera(nombre: String!, acronimo: String!, alumnos: [ID]): Carrera
    editarCarrera(id: ID!, nombre: String, acronimo: String, alumnos: [ID!]): Carrera
    eliminarCarrera(id: ID!): Carrera

    #Publicación
    crearPublicacion(usuario: ID!, fecha: Date!, texto: String, imagenes: [String], votacion: ID): Publicacion
    crearComentario(usuario: ID!, fecha: Date!, texto: String, imagenes: [String], votacion: ID, esComentario: ID!): Publicacion
    editarPublicacion(id: ID!, usuario: ID!, fecha: Date!, texto: String, imagenes: [String], votacion: VotacionInput, comentarios:[ID], likes: [ID]): Publicacion
    eliminarPublicacion(id: ID!): Publicacion
    likePublicacion(id: ID!, usuario: ID!): Publicacion

    # Crear Votación
    crearVotacion(pregunta: String!, opciones: [OpcionInput]!): Votacion
    editarVotacion(id: ID!, pregunta: String, opciones: [OpcionInput]): Votacion
    eliminarVotacion(id: ID!): Votacion
  
    # Crear Grupo
    crearGrupo(nombre: String!, privacidad: String!, vencimiento: Date, descripcion: String, admins: [ID]!, miembros: [ID]): Grupo
    editarGrupo(id: ID!, nombre: String, privacidad: String, vencimiento: Date, descripcion: String, admins: [ID], miembros: [ID], icono: String, banner: String): Grupo
    eliminarGrupo(id: ID!): Grupo
    solicitarUnirse(idGrupo: ID!, idUsuario: ID!): Grupo
    agregarAdmins(idGrupo: ID!, admins: [ID]!): Grupo
    agregarMiembros(idGrupo: ID!, miembros: [ID]!): Grupo
    eliminarAdmins(idGrupo: ID!, admins: [ID]!): Grupo
    eliminarMiembros(idGrupo: ID!, miembros: [ID]!): Grupo
    
    # Crear Chat
    crearChat(usuarios: [ID]!, nombre: String!, mensaje: MensajeInput): Chat
    eliminarChat(id: ID!): Chat
    addUsuariosToChat(id: ID!, usuarios: [ID!]): Chat
    openChat(id: ID!, usuario: ID!): Chat
    
    # Crear Mensaje
    addMensaje(id: ID!, mensaje: MensajeInput!): Mensaje
    editarMensaje(id: ID!, usuario: ID!, texto: String, imagenes: [String]): Mensaje
    eliminarMensaje(id: ID!): Mensaje
    markRead(id: ID!, usuario: ID!): Mensaje
    markRecived(id: ID!, usuario: ID!): Mensaje
    markReciveds(id: ID!, usuarios: [ID!]!): Mensaje

    # Crear Horario
    crearHorario(dia: String!, hora_inicio: Date!, hora_termino: Date!, asignatura: String!, sala: String!, acronimo: String, usuario: ID!): Horario
    editarHorario(id: ID!, dia: String, hora_inicio: Date, hora_termino: Date, asignatura: String, sala: String, acronimo: String, usuario: ID): Horario
    eliminarHorario(id: ID!): Horario
  }
  
type ForgotPasswordResponse {
    success: Boolean!
    markRead(id: ID!, usuario: ID!): Mensaje
    markRecived(id: ID!, usuario: ID!): Mensaje
    markReciveds(id: ID!, usuarios: [ID!]!): Mensaje
}
`
module.exports = typeDefs;
