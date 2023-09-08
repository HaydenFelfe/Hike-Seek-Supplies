import { ApolloClient, InMemoryCache } from '@apollo/client';

// Define the URI of your GraphQL server
const serverURI = 'http://localhost:4000/graphql'; // Replace with your server's URI

// Create a new instance of Apollo Client
const client = new ApolloClient({
  uri: serverURI,
  cache: new InMemoryCache(),
});

export default client;