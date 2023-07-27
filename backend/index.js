const { ApolloServer } = require("apollo-server");
require("./db.js");
require("./SocketServer.js");
const dotenv = require("dotenv");
const { mergeTypeDefs } = require("@graphql-toolkit/schema-merging");

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

//Queries
const { carreraQueries } = require("./queries/carreraQueries.js");
const { chatQueries } = require("./queries/chatQueries.js");
const { grupoQueries } = require("./queries/grupoQueries.js");
const { mensajeQueries } = require("./queries/mensajeQueries.js");
const { publicacionQueries } = require("./queries/publicacionQueries.js");
const { usuarioQueries } = require("./queries/usuarioQueries.js");
const { votacionQueries } = require("./queries/votacionQueries.js");
const { horarioQueries } = require("./queries/horarioQueries.js");

const { tagQueries } = require("./queries/tagQueries.js");
//Nesting
const {
  UsuarioNesting,
  CarreraNesting,
  MensajeNesting,
  ChatNesting,
  GrupoNesting,
  PublicacionNesting,
  TagNesting,
  TagInfoNesting,
} = require("./nesting/nestings.js");

//se importa el .env
dotenv.config();

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
    ...tagQueries,
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
    ...calendarioMutation,
    // ...ArchivoMutation,
  },
  Usuario: { ...UsuarioNesting },
  Grupo: { ...GrupoNesting },
  Carrera: { ...CarreraNesting },
  Chat: { ...ChatNesting },
  Mensaje: { ...MensajeNesting },
  Publicacion: { ...PublicacionNesting },
  Tag: { ...TagNesting },
  TagInfo: { ...TagInfoNesting },
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
    origin: "*",
    credentials: true,
  },
});

// Iniciar el servidor
apolloServer.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
