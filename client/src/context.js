// to create global context object data
import { createContext } from 'react';

// Context Object is a js object which gets store in a component's memory
// Here, we will create our global Auth Context State object to store Auth data & make
// it available to other files in order to consume it.
const AuthContext = createContext({
  currentUser: null,
});

export default AuthContext;
