const { data } = await axios.post("http://localhost:4000/graphql", {
    query: `
        mutation {
        crearCarrera(
            nombre: "${nombre}",
            acronimo: "${acronimo}"
        ) {
            nombre
            acronimo
        }
    }
    `,
});

module.exports = { data }
