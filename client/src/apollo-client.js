import { ApolloClient, InMemoryCache } from '@apollo/client';

// Define the URI of your GraphQL server
const serverURI = 'http://localhost:3001/graphql'; // Replace with your server's URI

// Create a new instance of Apollo Client
const client = new ApolloClient({
  uri: serverURI,
  cache: new InMemoryCache(),
});

export default client;
