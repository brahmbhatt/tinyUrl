const server = require('../../server');
const Models = require('../../models');

describe('check server response code for write rquest', () => {
  beforeAll((done) => {
    Models.urls.truncate().then(() => {
      done();
    });
  });
  test('Test for successfull post request to write long and short url to database', (done) => {
    const request = {
      method: 'POST',
      url: '/tinyUrl/write',
      payload: { url: 'www.brahmbhatt.com/1' },
    };
    server.inject(request, (response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
  test('Testcase if already stored longUrl passed', (done) => {
    const request = {
      method: 'POST',
      url: '/tinyUrl/write',
      payload: { url: 'www.brahmbhatt.com/1' },
    };
    server.inject(request, (response) => {
      expect(response.result.shortUrl).toBe('3vBmKI');
      done();
    });
  });

  test('Testcase for reading given stored shortUrl gives response 200 statusCode', (done) => {
    const request = {
      method: 'GET',
      url: '/tinyUrl/read?shortUrl=3vBmKI',
    };
    server.inject(request, (response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
  test('Testcase for reading given stored shortUrl gives response with correct longUrl', (done) => {
    const request = {
      method: 'GET',
      url: '/tinyUrl/read?shortUrl=3vBmKI',
    };
    server.inject(request, (response) => {
      expect(response.result).toBe('www.brahmbhatt.com/1');
      done();
    });
  });

  test('Testcase for reading not stored shortUrl gives response with statuscode 404', (done) => {
    const request = {
      method: 'GET',
      url: '/tinyUrl/read?shortUrl=3vBmK2',
    };
    server.inject(request, (response) => {
      expect(response.result.statusCode).toBe(404);
      done();
    });
  });
});
