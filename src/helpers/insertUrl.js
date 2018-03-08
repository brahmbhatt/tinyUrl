const Models = require('../../models');
const ShortUrl = require('../helpers/getShortUrl');

module.exports = function insertUrl(head, longUrl) {
  const shortUrl = ShortUrl.getShortUrl(longUrl, head, head + 6);
  console.log('******************', shortUrl);
  return Models.urls.createObject(shortUrl, longUrl).spread((userResult, created) => {
    if ((!created) && (userResult.long_url !== longUrl)) {
      head = (head + 1) % 26;
      console.log('conflict happend');
      return insertUrl(head, longUrl);
    }
    return { longUrl: userResult.long_url, shortUrl: userResult.short_url };
  });
};
