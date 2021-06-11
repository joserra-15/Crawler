const { getCache, setCache } = require('../services/cache');
const { getLink } = require('../services/hacker-news');
const { getAllInfoFromNews } = require('../utils');

async function crawler(req, res) {
  const { pageNumber } = req.params;

  try {
    const { indexCache, infoCache } = getCache(pageNumber);
    const response = [...infoCache];
    if (indexCache < pageNumber) {
      const promises = [];
      for (let index = indexCache + 1; index <= pageNumber; index++) {
        const { data } = await getLink(index);
        const news = getAllInfoFromNews(data);
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
