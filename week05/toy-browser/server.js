const http = require('http');

// Create an HTTP server
const server = http.createServer((req, res) => {
	console.log("request receivod");
	console.log(req.headers);
	res.setHeader('Content-Type', 'text/html');
	res.setHeader('X-Foo', 'bar');
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.end('okay');
});

server.listen(8088);