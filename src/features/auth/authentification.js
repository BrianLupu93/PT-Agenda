import axios from 'axios';

export const setAuthHeader = () => {
  if (localStorage.getItem('token')) {
    axios.defaults.headers.common[
      'Authorization'
    ] = `bearer ${localStorage.getItem('token')}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};
