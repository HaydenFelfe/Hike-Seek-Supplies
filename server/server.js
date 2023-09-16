// Import necessary modules at the top of your file
require('dotenv').config()

const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const express = require('express');
const path = require('path');
const cors = require("cors")
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)
const routes = require("./route/index")
const app = express();
const bodyParser = require("body-parser")
// const storeItems = new Map([
//   [1, { priceInCents: 199, name: "Camping Tent" }],
//   [2, { priceInCents: 79, name: "Hiking Backpack" }],
//   [3, { priceInCents: 149, name: "Used Snowboard" }],
//   [4, { priceInCents: 299, name: "Waterproof Kayak" }],
// ])

app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["POST", "PUT", "GET", "DELETE", "PATCH", "OPTIONS", "HEAD"],
    credentials: true,
  })
);

// app.post("/create-checkout-session", async (req, res) => {
//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       mode: "payment",
//       line_items: req.body.items.map(item => {
//         const storeItem = storeItems.get(item.id)
//         return {
//           price_data: {
//             currency: "usd",
//             product_data: {
//               name: storeItem.name,
//             },
//             unit_amount: storeItem.priceInCents,
//           },
//           quantity: item.quantity,
//         }
//       }),
//       success_url: `${process.env.CLIENT_URL}/success.html`,
//       cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
//     })
//     res.json({ url: session.url })
//   } catch (e) {
//     res.status(500).json({ error: e.message })
//   }
// })

//app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;
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
app.use(express.static("public"))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}
app.use(routes);

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