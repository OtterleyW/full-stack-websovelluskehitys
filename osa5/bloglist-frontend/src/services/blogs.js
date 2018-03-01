import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async blogObject => {
  const config = {
    headers: { Authorization: token }
  };

  console.log(blogObject)
  const url = `${baseUrl}/${blogObject._id}`
  const response = await axios.put(url, blogObject, config);
  return response.data;
}

export default { getAll, setToken, create, update };
