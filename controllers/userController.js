// Keeping our Auth logic separated from our Resolvers

// User modal to create new user & find existing user
const User = require('../models/User');

// library which enables to verify the id token
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID);

// find or create new user
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
      audience: process.env.OAUTH_CLIENT_ID,
    });

    // returning google user
    return ticket.getPayload();
  } catch (err) {
    console.error('Error verifying auth token', err);
  }
};

// check if user exists with email
// exec() to return Promise at the end
const checkIfUserExists = async email => await User.findOne({ email }).exec();

// create new user
const createNewUser = googleUser => {
  const { name, email, picture } = googleUser;

  const user = { name, email, picture };
  return new User(user).save();
};
