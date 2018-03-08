const ShortUrl = require('../../src/helpers/getShortUrl');

describe('testcases to check getShortUrl helper function', () => {
  test('should return the first 5 characters of the hash', (done) => {
    const longUrl = 'some random string';
    const shortUrl = ShortUrl.getShortUrl(longUrl, 0, 5);
    expect(shortUrl.length).toBe(5);
    done();
  });
  test('should return the same short url for same string', (done) => {
    const longUrl = 'some random string';
    const shortUrlOne = ShortUrl.getShortUrl(longUrl, 0, 10);
    const shortUrlTwo = ShortUrl.getShortUrl(longUrl, 0, 10);
    expect(shortUrlOne).toBe(shortUrlTwo);
    done();
  });
});
