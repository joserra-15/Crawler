const cheerio = require('cheerio');
const { getCache, setCache } = require('../services/cache');
const { getLink } = require('../services/hacker-news');

async function crawler(req, res) {
  const { pageNumber } = req.params;
  const { indexCache, infoCache } = getCache(pageNumber);

  try {
    const response = [...infoCache];
    if (indexCache < pageNumber) {
      const promises = [];
      for (let index = indexCache + 1; index <= pageNumber; index++) {
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

      response.push(...info);
      setCache(response);
    }
    return res.status(200).send(response.flat());
  } catch (error) {
    return res.status(400).send(error);
  }
}

module.exports = {
  crawler,
};
