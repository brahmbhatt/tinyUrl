const insertUrl = require('../../src/helpers/insertUrl');
const ShortUrl = require('../../src/helpers/getShortUrl');
const Models = require('../../models');
const Sinon = require('sinon');

describe('testcases to check getShortUrl helper function', () => {
  beforeEach((done) => {
    Models.urls.truncate().then(() => {
      done();
    });
  });
  test('should create a new URL entry into the db', (done) => {
    insertUrl(0, 'this is test string')
      .then((result) => {
        Models.urls.findAll({
          where: {
            short_url: result.shortUrl,
          },
        }).then((searchResult) => {
          expect(searchResult.length).toBe(1);
          done();
        });
      });
  });
  test('should recurse and insert if there is a collision in MD5', (done) => {
    const url1 = 'this is string 1';
    const url2 = 'this is string 2';
    const stub = Sinon.stub(ShortUrl, 'getShortUrl');
    stub.withArgs(url1, 0, 6).returns('123456');
    stub.withArgs(url2, 0, 6).returns('123456');
    stub.withArgs(url2, 1, 7).returns('ghijkl');

    insertUrl(0, url1)
      .then(() => {
        insertUrl(0, url2).then((result2) => {
          expect(result2.shortUrl).toBe('ghijkl');
          Models.urls.findAll({
            where: {
              short_url: result2.shortUrl,
            },
          }).then((searchResult) => {
            expect(searchResult.length).toBe(1);
            stub.restore();
            done();
          });
        });
      });
  });
});
