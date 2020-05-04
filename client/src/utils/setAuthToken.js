import axios from 'axios';

/*
 **sets the token in the header in axios object so that
 **we dont have to set the header explicitely everytime we make an auth call
 */
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
