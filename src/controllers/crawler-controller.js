const cheerio = require('cheerio');
const { getLink } = require('../services/hacker-news');

async function crawler(req, res) {
  const { pageNumber } = req.params;
  // const links = createLinks(req.params.pageNumber);
  const promises = [];

  for (let index = 1; index <= pageNumber; index++) {
    const { data } = await getLink(index);
    const $ = cheerio.load(data);

    promises.push($);
  }

  const info = await Promise.all(promises);
  console.log(info);
  res.status(200).send('ok');
}

module.exports = {
  crawler,
};
