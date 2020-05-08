var http = require('http');

var server =  http.createServer( (req, res) => {
    res.writeHead(200, {'content-type': 'text/html'});
    res.end('<h>Hello World </h>');
})

server.listen(8080, () => {
    console.log('listening 8080 port');
})
