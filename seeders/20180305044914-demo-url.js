const md5 = require('md5');
const bases = require('bases');

// const CatboxRedis = require('catbox-redis');

// let result = [];
function getUrlArray() {
  const urlObj = {};
  let urlArray = [];
  for (let i = 0; i < 100000; i += 1) {
    const num = `${i}`.padStart(6, '0');
    const long_url = `http://margi.com/${num}`;
    let head = 0;
    while (true) {
      const short_url = bases.toBase62(bases.fromBase16(md5(long_url))).substring(head, head + 6);
      if (urlObj[short_url] === undefined) {
        urlObj[short_url] = {
          long_url, short_url, createdAt: new Date(), updatedAt: new Date(),
        };
        // client.hset(short_url, long_url);
        // client.hget(short_url, long_url);
        head = 0;
        break;
      } else {
        head = (head + 1) % 26;
        if (head === 25) {
          head = 0;
          break;
        }
      }
    }
  }
  urlArray = Object.values(urlObj);
  // result = urlArray;
  return urlArray;
}
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('urls', getUrlArray(), {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('urls', null, {}),
};
