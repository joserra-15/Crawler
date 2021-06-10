const axios = require('axios');
const BASE_URL = 'https://news.ycombinator.com/news?p=';

async function getLink(page) {
  const response = await axios.get(`${BASE_URL}${page}`);
  return response;
}

module.exports = {
  getLink,
};
