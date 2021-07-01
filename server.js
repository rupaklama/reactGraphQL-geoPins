const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
require('dotenv').config();

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const { findOrCreateUser } = require('./controllers/userController');

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connected!'))
  .catch(err => console.error(err));

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,

  // context can be either Function or Object
  // It's useful for keeping data such as authentication info, the current user,
  // database connection, data sources and other things you need for running your business logic
  context: async ({ req }) => {
    // destructuring 'request object' to get any headers we are sending over

    let authToken = null;
    let currentUser = null;

    try {
      authToken = req.headers.authorization;
      if (authToken) {
        // find user if exists or create a new user
        currentUser = await findOrCreateUser(authToken);
      }
    } catch (err) {
      console.error(`Unable to authenticate user with token ${authToken}`);
    }

    // to make it available to Resolvers to execute query
    return { currentUser };
  },
});

// app object's listen method
apolloServer.listen({ port: process.env.PORT || 5000 }).then(({ url }) => {
  console.log(`Server listening on ${url}`);
});
