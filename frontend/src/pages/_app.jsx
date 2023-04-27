import "@/styles/globals.css";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";


export default function App({ Component, pageProps }) {

  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql", // TODO: Cambiar a la URL del .env
    cache: new InMemoryCache(),
  });

  return (
    // El componente ApolloProvider permite que todos los componentes hijos
    // tengan acceso al cliente Apollo y puedan realizar consultas a la API
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
