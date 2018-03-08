const redis = require('redis');

const client = redis.createClient();
const insertUrl = require('../helpers/insertUrl');
// const LongUrl = require('../helpers/longUrl');
const Models = require('../../models');

const route = [{
  method: 'POST',
  path: '/tinyUrl/write',
  handler: (request, response) => {
    const longUrl = request.payload.url;
    const promise = insertUrl(0, longUrl);
    promise.then(data => response(data));
  },
},
{
  method: 'GET',
  path: '/tinyUrl/read',
  handler: (request, response) => {
    const shortUrl = request.query.shortUrl;
    let longUrl = null;
    client.hget('urls', shortUrl, (err, reply) => {
      longUrl = reply;
      if (longUrl === null) {
        Models.urls.findOne({
          where: { short_url: shortUrl },
        }).then((data) => {
          if (data !== null) {
            client.hset('urls', shortUrl, data.long_url);
            client.hget('urls', shortUrl, (error, rep) => {
              response(rep);
            });
          } else {
            response({ statusCode: 404 });
          }
        });
      } else {
        client.hget('urls', shortUrl, (error, rep) => {
          response(rep);
        });
      }
    });
  },
},
];
module.exports = route;
