// const md5 = require('md5');
// const base62 = require('base62');
// const bases = require('bases');

// const str = md5('www.google.com');
// const str1 = bases.toBase62(bases.fromBase16(str));
// console.log('str', str);
// console.log('str1', str1);
const Catbox = require('catbox');

const options = {
  host: '127.0.0.1', // If you don't supply, 127.0.0.1 is the default
  port: 6379, // If you don't supply, 6379 is the default
  password: '', // If you don't supply, auth command not sent to redis
};
const client = new Catbox.Client(require('catbox-redis'), options);


client.start((error) => {
  if (error) { throw error; }
  console.log('Cache server started');
  console.log('---------------------------------');
});
