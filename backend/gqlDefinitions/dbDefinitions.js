const { gql } = require('apollo-server');


const typeDefs = gql`

scalar Date

type Usuario {
    id: ID!
    nombre: String!
    apellido: String!
    foto_perfil: String
    username: String!
    correo: String!
    contrasena:String!
    fecha_nacimiento: Date
    chats:[Chat]
    carrera: Carrera!
    grupos: [Grupo]
    amigos: [Usuario]
    publicaciones: [Publicacion]
    likes: [Publicacion]
    comentarios: [Publicacion]
    intereses:[TagInfo]
}

type Token{
    value: String!
}

type Calendario {
    id: ID!
    titulo: String!
    fecha_inicio: Date!
    fecha_fin: Date!
    descripcion: String
    creador: ID!
    invitados: [String]
    tipo: String
}

type Carrera {
    id: ID!
    nombre: String!
    acronimo: String! 
    alumnos: [Usuario]
}

type Publicacion {
    id: ID!
    usuario: Usuario!
    fecha: Date!
    imagenes: [String]
    texto: String
    votacion: Votacion
    comentarios: [Publicacion]
    likes:[Usuario]
    tagInfo: [TagInfo]
    enGrupo: Grupo
    esComentario: Publicacion
}

type TagInfo{
    tag: Tag!
    valor: Float!
}

type Tag {
    id: ID!
    nombre: String!
    publicaciones: [Publicacion]
    categoria: [Category]
}

type Category {
    id: ID!
    nombre: String!
    tags: [Tag]
}

type Votacion {
    id: ID!
    pregunta: String!
    opciones: [Opcion]!
}

type Opcion {
    id: ID!
    texto: String!
    votos: [Usuario]!
}

input VotacionInput {
    pregunta: String!
    opciones: [OpcionInput]!
}

input OpcionInput {
    texto: String!
    votos: [ID!]
}

type Grupo {
    id: ID!
    nombre: String!
    privacidad: String!
    vencimiento: Date
    descripcion: String
    icono: String
    banner: String
    chat: Chat!
    admins: [Usuario]!
    miembros: [Usuario]!
    solicitudes: [Usuario]!
}

type Chat {
    id: ID!
    usuarios: [Usuario]!
    nombre: String!
    mensajes: [Mensaje]
}

type Mensaje {
    id: ID!
    fecha: Date!
    usuario: Usuario!
    texto: String
    imagenes: [String]
    recibido : [Usuario]
    visto: [Usuario]
}

input MensajeInput { 
    fecha: Date!
    usuario: ID!
    texto: String
    imagenes: [String]
    visto: [ID]
}

type Horario{
    id: ID!
    dia: String!
    hora_inicio: Date!
    hora_termino: Date!
    asignatura: String!
    sala: String!
    acronimo: String
    usuario: [Usuario]!
  }

type Archivo {
    id: ID!
    url: String!
    filename: String!
    mimetype: String!
}

type Reporte{
    id: ID!
    usuario: String!
    fecha: Date!
    titulo: String!
    descripcion: String
    tipo: String!
    id_elemento: String!
    estado: String!
    resolucion: String
}

type idAdmin{
    id: ID!
    idAdmin: [String]!
}

`

module.exports = typeDefs;
