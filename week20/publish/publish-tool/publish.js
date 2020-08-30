const http = require('http');
// const querystring = require('querystring');
// const fs = require('fs');
const archiver = require('archiver');
const child_process = require('child_process');

// const postData = querystring.stringify({
//   'content': 'Hello World!! 2333'
// })

let packageName = './package';

const redirect_uri = encodeURIComponent('http://localhost:8081/auth')
const url = `https://github.com/login/oauth/authorize?client_id=Iv1.07f900518d95e9c3&redirect_uri=${redirect_uri}`;

child_process.exec(`start ${url}`);

// fs.stat(filename, (error, stat) => {
const server = http.createServer((request, res) => {
  console.log(request.url);
  console.log('publish!!!');
  if (request.url.match(/^\/favicon.ico/)) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
    return;
  }

  let token = request.url.match(/token=([^&]+)/)[1];
  console.log('token ' + token);

  const options = {
    host: 'localhost',
    port: 8081,
    path: '/?filename=package.zip',
    method: 'POST',
    headers: {
      token: token,
      'Content-Type': 'application/x-www-form-urlencoded',
      // 'Content-Type': 'application/octet-stream ',
      // 'Content-Length': stat.size,
    },
  };

  const archive = archiver('zip', {
    zlib: { level: 9 },
  });

  archive.directory(packageName, false);
  archive.finalize();

  const req = http.request(options, (res) => {
    console.log(`状态码: ${res.statusCode}`);
    console.log(`响应头: ${JSON.stringify(res.headers)}`);
  });

  req.on("error", (e) => {
    console.error(`请求遇到问题: ${e.message}`);
  });

  archive.pipe(req);

  archive.on('end', () => {
    req.end();
    console.log('publish success!!!');
    res.end('publish success!!!');
    server.close();
  });

  req.on('error', e => {
    console.error(e.message);
  });
});

server.listen(8080);