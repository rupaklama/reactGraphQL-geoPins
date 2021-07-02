// to update our global context object data
export default function reducer(state, { type, payload }) {
  switch (type) {
    case 'LOGIN_USER':
      return {
        ...state,
        currentUser: payload,
      };

    // tracking user across our app whether or not user is authenticated or not
    // to persist auth user
    case 'IS_LOGGED_IN':
      return {
        ...state,
        isAuth: payload,
      };
    case 'SIGNOUT_USER':
      return {
        ...state,
        currentUser: null,
        isAuth: false,
      };
    default:
      return state;
  }
}
