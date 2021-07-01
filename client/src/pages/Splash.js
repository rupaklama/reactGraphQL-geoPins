import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import Login from '../components/Auth/Login';

// global context - data store
import Context from '../context';

const Splash = () => {
  // accessing global context object for auth status
  const { state } = useContext(Context);

  // if user is authenticated, direct to homepage else to login page
  return state.isAuth ? <Redirect to='/' /> : <Login />;
};

export default Splash;
