const { gql } = require("apollo-server");

const typeDefs = gql`
  scalar Date

  type Usuario {
    id: ID!
    nombre: String!
    apellido: String!
    nombre_usuario: String!
    correo: String!
    fecha_nacimiento: Date
    carrera: [Carrera]!
    estado: String!
    grupos: [Grupo]
    rol: String
    amigos: [Usuario]
    publicaciones: [Publicacion]
    me_gusta: [Publicacion]
    comentarios: [Publicacion]
  }

  type Carrera {
    id: ID!
    nombre: String!
    acronimo: String!
  }

  type Publicacion {
    id: ID!
    usuario: [Usuario]!
    hora: Date!
    imagen_url: String
    texto: String
    votaciones: [Votacion]
    comentarios: [Publicacion]
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
    cantVotos: Int!
  }

  type Grupo {
    id: ID!
    nombre: String!
    privacidad: String!
    vencimiento: Date
    descripcion: String
    chat: [Chat]
    admin: [Usuario]!
    miembros: [Usuario]!
  }

  type Chat {
    id: ID!
    mensajes: [Mensaje]
  }

  type Mensaje {
    id: ID!
    hora: Date!
    usuario: [Usuario]!
    texto: String
    imagen: String
    visto: [Usuario]
  }
`;

module.exports = typeDefs;
