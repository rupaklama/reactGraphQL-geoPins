// Keeping our Auth logic separated from our Resolvers

// User modal to create new user & find existing user
const User = require('../models/User');

// library which enables to verify the id token
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID); // OAUTH_CLIENT_ID in .env

// Function to find or create a new user
exports.findOrCreateUser = async token => {
  // verify auth token
  const googleUser = await verifyAuthToken(token);

  // check if user exists with email
  const user = await checkIfUserExists(googleUser.email);

  // if user exists, return it
  // otherwise, create new user in db
  return user ? user : createNewUser(googleUser);
};

// verify auth token
const verifyAuthToken = async token => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.OAUTH_CLIENT_ID, // OAUTH_CLIENT_ID in .env
    });

    // returning google user
    return ticket.getPayload();
  } catch (err) {
    console.error('Error verifying auth token', err);
  }
};

// check if user exists with email
// exec() to return Promise & adding it at the end
const checkIfUserExists = async email => await User.findOne({ email }).exec();

// create new user with query fields
const createNewUser = googleUser => {
  // destructuring require fields from google account
  const { name, email, picture } = googleUser;

  // creating user with require fields above
  const user = { name, email, picture };

  // using User constructor to create new user in db
  return new User(user).save();
};
