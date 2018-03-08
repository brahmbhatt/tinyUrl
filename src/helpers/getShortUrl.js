const md5 = require('md5');
const bases = require('bases');

module.exports = {
  getShortUrl: (longUrl, startIndex, endIndex) => {
    const shortUrl = bases.toBase62(bases.fromBase16(md5(longUrl))).substring(startIndex, endIndex);
    return shortUrl;
  },
};

