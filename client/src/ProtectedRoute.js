import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

// global context object - data store
import Context from './context';

// For Authenticated Users
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { state } = useContext(Context);
  return (
    // if user is not authenticated, redirect to login page else to the Component
    <Route
      render={props => (!state.isAuth ? <Redirect to='/login' /> : <Component {...props} />)}
      {...rest}
    />
  );
};

export default ProtectedRoute;
