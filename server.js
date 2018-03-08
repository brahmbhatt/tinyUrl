const Hapi = require('hapi');
const Routes = require('./src/routes');
const Good = require('good');
const catboxRadis = require('catbox-redis');


const server = new Hapi.Server();
// server.cache({

// })
server.connection({
  port: 8088,
  host: 'localhost',
});
server.register({
  register: Good,
  options: {
    reporters: {
      console: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{
          response: '*',
          log: '*',
        }],
      }, {
        module: 'good-console',
      }, 'stdout'],
    },
  },
}, (err) => {
  if (err) {
    throw err;
  }
});


server.route(Routes);

if (!module.parent) {
  server.start((error) => {
    if (error) {
      throw (error);
    }
    console.log('Server started at port 8088');
  });
}

module.exports = server;
