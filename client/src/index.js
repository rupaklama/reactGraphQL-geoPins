import React, { useContext, useReducer } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from './pages/App';
import Splash from './pages/Splash';

// global context - data store
import Context from './context';

// reducer
import reducer from './reducer';

import 'mapbox-gl/dist/mapbox-gl.css';
import * as serviceWorker from './serviceWorker';

// to check if user is authenticated
import ProtectedRoute from './ProtectedRoute';

const Root = () => {
  // To consume Context object, we need to use useContext hook
  const initialState = useContext(Context);

  // useReducer - to update root reducer which takes reducer & initial state
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log({ state });

  return (
    // Context returns an object with 2 values: special components - { Provider, Consumer }
    // Provider component wraps around a tree of components that can have an access to the Context Object
    // using Provider component of Context object to make a value available to all
    // children and grandchildren by using value={} property
    <Router>
      <Context.Provider value={{ state, dispatch }}>
        <Switch>
          <ProtectedRoute exact path='/' component={App} />
          <Route path='/login' component={Splash} />
        </Switch>
      </Context.Provider>
    </Router>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
