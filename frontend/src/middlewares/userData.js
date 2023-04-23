// middleware to get user data from database using GraphQL

const { ApolloClient, InMemoryCache, gql } = require("@apollo/client");

// TODO: modificar para hacer el request a la API
const client = new ApolloClient({
    uri: "http://localhost:3000/api/graphql",
    cache: new InMemoryCache(),
});

const getUserData = async (req, res, next) => {

    const { userId } = req.session;
    // verificar que los datos sean con ese nombre
    if (userId) {
        const { data } = await client.query({
            query: gql`
                query {
                    user(id: "${userId}") {
                        id
                        nombre
                        apellido
                        email
                        avatar
                    }
                }
            `,
        });

        req.user = data.user;
    }

    next();
};

module.exports = getUserData;
