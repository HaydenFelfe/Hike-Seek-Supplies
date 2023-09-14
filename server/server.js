// Import necessary modules at the top of your file
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3000;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
  formatError: (error) => {
    // Log GraphQL errors to the console
    console.error(error);

    // You can also log errors to a file or a logging service
    // Example: logErrorToService(error);

    return error;
  },
});

// Middleware to extract the 'q' parameter from the URL
app.use((req, res, next) => {
  // Extract the 'q' parameter from the URL query string
  const searchQuery = req.query.q;

  // Store the 'searchQuery' in the request object
  req.searchQuery = searchQuery;

  // Continue processing the request
  next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

startApolloServer();
