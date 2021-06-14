const NodeCache = require('node-cache');
const KEY_CACHE = 'crawler';
const TIME_TO_EXPIRED = 60;
const cache = new NodeCache({ checkperiod: TIME_TO_EXPIRED });

function getCache(pages) {
  const infoCache = cache.get(KEY_CACHE) || [];
  let indexCache = infoCache.length;

  if (indexCache > 0) {
    if (indexCache >= pages) {
      infoCache.splice(pages);
    }
  }

  return { indexCache, infoCache };
}

function setCache(data) {
  cache.set(KEY_CACHE, data, TIME_TO_EXPIRED);
}

cache.on('expired', function (key) {
  console.log(`The cache ${key} has expired`);
});

module.exports = {
  getCache,
  setCache,
  cache,
};
