const server = require('./server.js');
const router = require('./router.js');
const requestHandlers = require('./request-handlers.js');

const handle = {
    '/': requestHandlers.start,
    '/start': requestHandlers.start,
    '/upload': requestHandlers.upload
};

server.start(router.route, handle);
