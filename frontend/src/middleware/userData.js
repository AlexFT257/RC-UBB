const { ApolloClient, InMemoryCache, gql, ApolloError } = require("@apollo/client");

// TODO: modificar para hacer el request a la API
const client = new ApolloClient({
    uri: "http://localhost:3000/api/graphql",
    cache: new InMemoryCache(),
});

const getUserData = async (req, res, next) => {
    const { userId } = req.session;

    if (userId) {
        try {
            const { data } = await client.query({
                query: gql`
                    query {
                        user(id: "${userId}") {
                            id
                            nombre
                            apellido
                            correo
                            avatar
                        }
                    }
                `,
            });

            req.user = data.user;
        } catch (error) {
            // Manejar el error de Apollo Client
            console.error("Error en la consulta GraphQL:", error);
            throw new ApolloError("Error en la consulta GraphQL", "GRAPHQL_ERROR");
        }
    }

    next();
};

module.exports = getUserData;
