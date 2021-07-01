import React, { useContext } from 'react';

// 'graphql-request' is a great library when we want to Execute a Query or Mutation
// & we don't want to set up a library with boilerplate like Apollo
import { GraphQLClient } from 'graphql-request';

import { GoogleLogin } from 'react-google-login';

import { withStyles } from '@material-ui/core/styles';
import Context from '../../context';

// welcome text
import Typography from '@material-ui/core/Typography';

// GOOGLE login user query
import { ME_QUERY } from '../../graphql/queries';

const Login = ({ classes }) => {
  // To consume Context object, we need to use useContext hook
  const { dispatch } = useContext(Context);

  const onSuccess = async googleUser => {
    try {
      // console.log(googleUser);
      // User provide google credentials & we get this id_token
      // we want to authenticate 'user' on our backend server
      const idToken = googleUser.getAuthResponse().id_token;

      // sending itToken to our backend server & checking to see if its valid
      // adding the user's google information on our backend
      const client = new GraphQLClient('http://localhost:5000/graphql', {
        headers: { authorization: idToken },
        // note - we will work with response token to auth user in our context in server.js
      });

      // To execute a query or mutation, we can get the return value of GraphQLClient Instance
      // & make a request with request() - method which returns a Promise

      // when we execute query from the client asking current user information
      // we will send it back to client from the server & redirect user to App component
      const data = await client.request(ME_QUERY);

      // update auth state in our context
      dispatch({ type: 'LOGIN_USER', payload: data.me });

      // tracking user across our app whether or not user is authenticated or not, to persist auth user
      // note - isSignedIn() is going return 'true' whenever user is authenticated
      dispatch({ type: 'IS_LOGGED_IN', payload: googleUser.isSignedIn() });
    } catch (err) {
      onFailure(err);
    }
  };

  const onFailure = err => {
    console.error('Error logging in', err);
  };

  return (
    <div className={classes.root}>
      <Typography component='h1' variant='h3' gutterBottom noWrap style={{ color: 'rgb(66, 133, 244)' }}>
        Welcome
      </Typography>

      <GoogleLogin
        clientId='668511452220-4ft1oi0jcdqu8870agqle0r6nh7r43er.apps.googleusercontent.com'
        // to persist auth if user signed in before
        isSignedIn={true}
        onSuccess={onSuccess}
        onFailure={onFailure}
        theme='dark'
      />
    </div>
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
