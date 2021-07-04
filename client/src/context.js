// to create global context object - data store
import { createContext } from 'react';

// Context Object is a js object which gets store in a component's memory
// Here, we will create our global Context State object to store data & make
// it available to other files in order to consume it.
const Context = createContext({
  currentUser: null,
  isAuth: false,
  // marker draft to set it
  draft: null,
});

export default Context;
