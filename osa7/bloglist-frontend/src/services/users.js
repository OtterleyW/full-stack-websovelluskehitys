import axios from 'axios';
const baseUrl = '/api/users';

let token;

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const setToken = newToken => {
  token = `bearer ${newToken}`;
  console.log(token);
};

export default { getAll, setToken };
