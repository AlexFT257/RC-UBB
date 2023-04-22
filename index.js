const { ApolloServer } = require('apollo-server');
require('./db.js')
const dotenv = require('dotenv');
const { mergeTypeDefs } = require('@graphql-toolkit/schema-merging');
//Definitions
const dbDefinitions = require('./gqlDefinitions/dbDefinitions.js');
const mutationsDefinitions = require('./gqlDefinitions/mutationsDefinition.js');
const queriesDefinitions = require('./gqlDefinitions/queriesDefinition.js');
//Mutations
const carreraMutation = require('./mutation/carreraMutation.js');
const chatMutation = require('./mutation/chatMutation.js');
const grupoMutation = require('./mutation/grupoMutation.js');
const mensajeMutation = require('./mutation/mensajeMutation.js');
const opcionMutation = require('./mutation/opcionMutation.js');
const publicacionMutation = require('./mutation/publicacionMutation.js');
const usuarioMutation = require('./mutation/usuarioMutation.js');
const votacionMutation = require('./mutation/votacionMutation.js');
//Queries
const { carreraQueries } = require('./queries/carreraQueries.js');
const { chatQueries } = require('./queries/chatQueries.js');
const { grupoQueries } = require('./queries/grupoQueries.js');
const { mensajeQueries } = require('./queries/mensajeQueries.js');
const { opcionQueries } = require('./queries/opcionQueries.js');
const { publicacionQueries } = require('./queries/publicacionQueries.js');
const { usuarioQueries } = require('./queries/usuarioQueries.js');
const { votacionQueries } = require('./queries/votacionQueries.js');
//se importa el .env
dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET //se obtiene el JWT_SECRET del .env

//se crean los resolvers
const resolvers = {
    Query: {
        ...carreraQueries,
        ...chatQueries,
        ...grupoQueries,
        ...mensajeQueries,
        ...opcionQueries,
        ...publicacionQueries,
        ...usuarioQueries,
        ...votacionQueries
    },
    Mutation: {
        ...carreraMutation,
        ...chatMutation,
        ...grupoMutation,
        ...mensajeMutation,
        ...opcionMutation,
        ...publicacionMutation,
        ...usuarioMutation,
        ...votacionMutation
    }

}

const server = new ApolloServer({
    typeDefs: mergeTypeDefs([dbDefinitions, mutationsDefinitions, queriesDefinitions]),
    resolvers
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})
