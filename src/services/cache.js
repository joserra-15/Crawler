const NodeCache = require('node-cache');
const cache = new NodeCache({ checkperiod: 10 });
const KEY_CACHE = 'crawler';

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
  cache.set(KEY_CACHE, data, 10);
}

cache.on('expired', function (key) {
  console.log(`The cache ${key} has expired`);
});

module.exports = {
  getCache,
  setCache,
};
