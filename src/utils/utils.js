const cheerio = require('cheerio');

function getAllInfoFromNews(data) {
  const $ = cheerio.load(data);

  const news = [];
  $('.itemlist .athing').each((_, element) => {
    const createNew = {
      rank: $(element).find('.title .rank').text().trim(),
      title: $(element).find('.title .storylink').text().trim(),
      url: $(element).find('.title .storylink').attr('href').trim(),
      author: $(element).next().find('.hnuser').text().trim(),
      score: $(element).next().find('.score').text().trim(),
      date: $(element).next().find('.age a').text().trim(),
      comments: $(element).next().find('a').last().text().trim(),
    };

    news.push(createNew);
  });

  return news;
}

module.exports = {
  getAllInfoFromNews,
};
