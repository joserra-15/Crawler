const cheerio = require('cheerio');
const { getLink } = require('../services/hacker-news');

async function crawler(req, res) {
  const { pageNumber } = req.params;
  // const links = createLinks(req.params.pageNumber);
  const promises = [];
  try {
    for (let index = 1; index <= pageNumber; index++) {
      const { data } = await getLink(index);
      const $ = cheerio.load(data);

      let news = [];
      $('.itemlist .athing').each((_, element) => {
        const createNew = {
          rank: $(element).find('.title .rank').text().trim(),
          title: $(element).find('.title .storylink').text().trim(),
          score: $(element).next().find('.score').text().trim(),
          date: $(element).next().find('.age a').text().trim(),
          comments: $(element).next().find('a').last().text().trim(),
        };

        news = [...news, createNew];
      });

      promises.push(news);
    }

    const info = await Promise.all(promises);
    // console.log(info);
    res.status(200).send(info.flat());
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}

module.exports = {
  crawler,
};
