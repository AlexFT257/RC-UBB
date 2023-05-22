const { ApolloServer } = require('apollo-server');
const { mergeTypeDefs } = require('@graphql-toolkit/schema-merging');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { parseCookies, setCookie } = require('cookie');
// Se importa la configuración de la base de datos
require('./db.js');

// Definitions
const dbDefinitions = require('./gqlDefinitions/dbDefinitions.js');
const mutationsDefinitions = require('./gqlDefinitions/mutationsDefinition.js');
const queriesDefinitions = require('./gqlDefinitions/queriesDefinition.js');

// Mutations
const carreraMutation = require('./mutation/carreraMutation.js');
const chatMutation = require('./mutation/chatMutation.js');
const grupoMutation = require('./mutation/grupoMutation.js');
const mensajeMutation = require('./mutation/mensajeMutation.js');
const opcionMutation = require('./mutation/opcionMutation.js');
const publicacionMutation = require('./mutation/publicacionMutation.js');
const usuarioMutation = require('./mutation/usuarioMutation.js');
const votacionMutation = require('./mutation/votacionMutation.js');

// Queries
const { carreraQueries } = require('./queries/carreraQueries.js');
const { chatQueries } = require('./queries/chatQueries.js');
const { grupoQueries } = require('./queries/grupoQueries.js');
const { mensajeQueries } = require('./queries/mensajeQueries.js');
const { opcionQueries } = require('./queries/opcionQueries.js');
const { publicacionQueries } = require('./queries/publicacionQueries.js');
const { usuarioQueries } = require('./queries/usuarioQueries.js');
const { votacionQueries } = require('./queries/votacionQueries.js');

// Se importa el .env
dotenv.config();

// Función para verificar y decodificar el token
const verifyToken = (token) => {
  console.log('token index:', token);
  try {
    return jwt.verify(token, 'SUPER_HYPER_MEGA_PALABRA_SECRETA');
  } catch (error) {
    return null;
  }
};

// Se crea el objeto de resolvers
const resolvers = {
  Query: {
    ...carreraQueries,
    ...chatQueries,
    ...grupoQueries,
    ...mensajeQueries,
    ...opcionQueries,
    ...publicacionQueries,
    ...usuarioQueries,
    ...votacionQueries,
  },
  Mutation: {
    ...carreraMutation,
    ...chatMutation,
    ...grupoMutation,
    ...mensajeMutation,
    ...opcionMutation,
    ...publicacionMutation,
    ...usuarioMutation,
    ...votacionMutation,
  },
};

// Crear una instancia de Apollo Server
const server = new ApolloServer({
  typeDefs: mergeTypeDefs([dbDefinitions, mutationsDefinitions, queriesDefinitions]),
  resolvers,
  
  cors: {
    credentials: true, // Habilitar el envío de cookies
    origin: '*', // Permitir solicitudes de cualquier origen
  },
});

// Iniciar el servidor
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
