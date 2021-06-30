const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
require('dotenv').config();

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

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
});

// app object's listen method
apolloServer.listen({ port: process.env.PORT || 5000 }).then(({ url }) => {
  console.log(`Server listening on ${url}`);
});
