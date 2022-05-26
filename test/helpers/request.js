require('dotenv').config();
const Axios = require('axios');

const TOKEN = process.env.TOKEN;
const BASE_URL = 'https://gorest.co.in/public/v2';

const axios = Axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

module.exports = axios;
