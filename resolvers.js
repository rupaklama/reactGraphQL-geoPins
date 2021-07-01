const { AuthenticationError } = require('apollo-server');

// hoc func is going to wrap our Resolver Function
const authenticated = next => (root, args, ctx, info) => {
  // if no current user returned from our 'context' func in ApolloServer instance
  if (!ctx.currentUser) {
    throw new AuthenticationError('You must be logged in');
  }

  // if we have a user, return 'next' to execute resolver func
  return next(root, args, ctx, info);
};

module.exports = {
  Query: {
    // returning current user from context
    me: authenticated((root, args, ctx) => ctx.currentUser),
  },
};
