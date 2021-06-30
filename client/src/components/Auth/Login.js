import React from 'react';
import { GoogleLogin } from 'react-google-login';

import { withStyles } from '@material-ui/core/styles';
// import Typography from "@material-ui/core/Typography";

const Login = ({ classes }) => {
  const onSuccess = googleUser => {
    // console.log(googleUser);
    // to get user id_token
    const idToken = googleUser.getAuthResponse().id_token;
    console.log(idToken);
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
