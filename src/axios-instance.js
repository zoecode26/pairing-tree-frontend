import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pair-tree-backend.herokuapp.com/'
});

export default instance;