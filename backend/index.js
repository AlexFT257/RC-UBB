const { ApolloServer } = require('apollo-server');
require('./db.js')
require('./SocketServer.js')
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
const mensajeMutation = require('./mutation/mensajeMutation.js')
const publicacionMutation = require('./mutation/publicacionMutation.js');
const usuarioMutation = require('./mutation/usuarioMutation.js');
const votacionMutation = require('./mutation/votacionMutation.js');
const horarioMutation = require('./mutation/horarioMutation.js');
//Queries
const { carreraQueries } = require('./queries/carreraQueries.js');
const { chatQueries } = require('./queries/chatQueries.js');
const { grupoQueries } = require('./queries/grupoQueries.js');
const { mensajeQueries } = require('./queries/mensajeQueries.js');
const { publicacionQueries } = require('./queries/publicacionQueries.js');
const { usuarioQueries } = require('./queries/usuarioQueries.js');
const { votacionQueries } = require('./queries/votacionQueries.js');
const { horarioQueries } = require('./queries/horarioQueries.js');
//Nesting
const { UsuarioNesting, CarreraNesting, MensajeNesting, ChatNesting } = require('./nesting/nestings.js')
const { mergeTypeDefs } = require('@graphql-toolkit/schema-merging');
//Definitions
const dbDefinitions = require('./gqlDefinitions/dbDefinitions.js');
const mutationsDefinitions = require('./gqlDefinitions/mutationsDefinition.js');
const queriesDefinitions = require('./gqlDefinitions/queriesDefinition.js');
//Mutations
const calendarioMutation = require('./mutation/calendarioMutation.js');
const carreraMutation = require('./mutation/carreraMutation.js');
const chatMutation = require('./mutation/chatMutation.js');
const grupoMutation = require('./mutation/grupoMutation.js');
const mensajeMutation = require('./mutation/mensajeMutation.js')
const publicacionMutation = require('./mutation/publicacionMutation.js');
const usuarioMutation = require('./mutation/usuarioMutation.js');
const votacionMutation = require('./mutation/votacionMutation.js');
//Queries
const { carreraQueries } = require('./queries/carreraQueries.js');
const { chatQueries } = require('./queries/chatQueries.js');
const { grupoQueries } = require('./queries/grupoQueries.js');
const { mensajeQueries } = require('./queries/mensajeQueries.js');
const { publicacionQueries } = require('./queries/publicacionQueries.js');
const { usuarioQueries } = require('./queries/usuarioQueries.js');
const { votacionQueries } = require('./queries/votacionQueries.js');
//Nesting
const { UsuarioNesting, CarreraNesting, MensajeNesting, ChatNesting } = require('./nesting/nestings.js')

//se importa el .env
//se importa el .env
dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET //se obtiene el JWT_SECRET del .env

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
        ...horarioQueries
    },
    Mutation: {
        ...carreraMutation,
        ...chatMutation,
        ...grupoMutation,
        ...mensajeMutation,
        ...publicacionMutation,
        ...usuarioMutation,
        ...votacionMutation,
        ...horarioMutation
    },
    Usuario: {...UsuarioNesting},
    Carrera: {...CarreraNesting},
    Chat: {...ChatNesting},
    Mensaje: {...MensajeNesting}

}

const apolloServer = new ApolloServer({
    typeDefs: mergeTypeDefs([dbDefinitions, mutationsDefinitions, queriesDefinitions]),
    resolvers
})

apolloServer.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})
