import React, { useContext } from 'react';

// 'graphql-request' is a great library when we want to Execute a Query or Mutation
// & we don't want to set up a library with boilerplate like Apollo
import { GraphQLClient } from 'graphql-request';

import { GoogleLogin } from 'react-google-login';

import { withStyles } from '@material-ui/core/styles';
import AuthContext from '../../context';
// import Typography from "@material-ui/core/Typography";

// user query
const ME_QUERY = `
{
  me {
    _id
    name
    email
    picture
  }
}
`;

const Login = ({ classes }) => {
  // To consume Context object, we need to use useContext hook
  const { dispatch } = useContext(AuthContext);

  const onSuccess = async googleUser => {
    // console.log(googleUser);
    // User provide google credentials & we get this id_token
    // we want to authenticate 'user' on our backend server
    const idToken = googleUser.getAuthResponse().id_token;

    // sending itToken to our backend server & checking to see if its valid
    // adding the user's google information on our backend
    const client = new GraphQLClient('http://localhost:5000/graphql', {
      headers: { authorization: idToken },
    });

    // To execute a query or mutation, we can get the return value of GraphQLClient Instance
    // & make a request with request() - method which returns a Promise

    // when we execute query from the client asking current user information
    // we will send it back to client from the server & redirect user to App component
    const data = await client.request(ME_QUERY);
    dispatch({ type: 'LOGIN_USER', payload: data.me });
  };

  return (
    <GoogleLogin
      clientId='668511452220-4ft1oi0jcdqu8870agqle0r6nh7r43er.apps.googleusercontent.com'
      // to persist auth if user signed in before
      isSignedIn={true}
      onSuccess={onSuccess}
    />
  );
};

const styles = {
  root: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
};

export default withStyles(styles)(Login);
