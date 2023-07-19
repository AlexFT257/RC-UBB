const { ApolloServer } = require("apollo-server");
require("./SocketServer.js");
//Nesting
const { mergeTypeDefs } = require("@graphql-toolkit/schema-merging");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { parseCookies, setCookie } = require("cookie");
// Se importa la configuración de la base de datos
require("./db.js");

// Definitions
const dbDefinitions = require("./gqlDefinitions/dbDefinitions.js");
const mutationsDefinitions = require("./gqlDefinitions/mutationsDefinition.js");
const queriesDefinitions = require("./gqlDefinitions/queriesDefinition.js");
//Mutations
const calendarioMutation = require("./mutation/calendarioMutation.js");
const carreraMutation = require("./mutation/carreraMutation.js");
const chatMutation = require("./mutation/chatMutation.js");
const grupoMutation = require("./mutation/grupoMutation.js");
const mensajeMutation = require("./mutation/mensajeMutation.js");
const publicacionMutation = require("./mutation/publicacionMutation.js");
const usuarioMutation = require("./mutation/usuarioMutation.js");
const votacionMutation = require("./mutation/votacionMutation.js");
const horarioMutation = require("./mutation/horarioMutation.js");
// const ArchivoMutation = require("./mutation/archivoMutation.js");

//Queries
const { carreraQueries } = require("./queries/carreraQueries.js");
const { chatQueries } = require("./queries/chatQueries.js");
const { grupoQueries } = require("./queries/grupoQueries.js");
const { mensajeQueries } = require("./queries/mensajeQueries.js");
const { publicacionQueries } = require("./queries/publicacionQueries.js");
const { usuarioQueries } = require("./queries/usuarioQueries.js");
const { votacionQueries } = require("./queries/votacionQueries.js");
const { horarioQueries } = require("./queries/horarioQueries.js");

//Nesting
const {
  UsuarioNesting,
  CarreraNesting,
  MensajeNesting,
  ChatNesting,
  GrupoNesting,
} = require("./nesting/nestings.js");

//se importa el .env
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET; //se obtiene el JWT_SECRET del .env

// Función para verificar y decodificar el token
const verifyToken = (token) => {
  console.log("token index:", token);
  try {
    return jwt.verify(token, "SUPER_HYPER_MEGA_PALABRA_SECRETA");
  } catch (error) {
    return null;
  }
};

//se crean los resolvers
//se crean los resolvers
const resolvers = {
  Query: {
    ...carreraQueries,
    ...chatQueries,
    ...grupoQueries,
    ...mensajeQueries,
    ...publicacionQueries,
    ...usuarioQueries,
    ...votacionQueries,
    ...horarioQueries,
  },
  Mutation: {
    ...carreraMutation,
    ...chatMutation,
    ...grupoMutation,
    ...mensajeMutation,
    ...publicacionMutation,
    ...usuarioMutation,
    ...votacionMutation,
    ...horarioMutation,
    // ...ArchivoMutation,
  },
  Usuario: { ...UsuarioNesting },
  Grupo: { ...GrupoNesting },
  Carrera: { ...CarreraNesting },
  Chat: { ...ChatNesting },
  Mensaje: { ...MensajeNesting },
};

// Crear una instancia de Apollo Server
const apolloServer = new ApolloServer({
  typeDefs: mergeTypeDefs([
    dbDefinitions,
    mutationsDefinitions,
    queriesDefinitions,
  ]),
  resolvers,

  cors: {
    credentials: true, // Habilitar el envío de cookies
    origin: "*", // Permitir solicitudes de cualquier origen
  },
});

// Iniciar el servidor
apolloServer.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
