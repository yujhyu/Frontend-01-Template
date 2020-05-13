const net = require('net');

class Request {
	// method
	// url host + port + path
	// body k:v
	// headers
	constructor(options) {
		this.method = options.method || 'GET';
		this.host = options.host;
		this.port = options.port || 80;
		this.path = options.path || '/';
		this.body = options.body || {};
		this.headers = options.headers || {};

		if (!this.headers['Content-Type']) {
			this.headers['Content-Type'] = 'application/x-www-form-urlencoded';
		}

		if (this.headers['Content-Type'] === 'application/json') {
			this.bodyText = JSON.stringify(this.body);
		} else if (this.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
			this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join('&')
		}

		this.headers['Content-Length'] = this.bodyText.length;
	}

	toString() {
		return `${this.method} ${this.path} HTTP/1.1\r
		${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n')}\r
		${this.bodyText}`
	}

	send(connection) {
		return new Promise((resolve, reject) => {
			const parser = new ResponseParser;

			if (connection) {
				connection.write(this.toString());
			} else {
				connection = net.createConnection({
					host: this.host,
					port: this.port
				}, () => {
					connection.write(this.toString());
				});
			}

			connection.on('data', (data) => {
				parser.receive(data.toString());
				console.log(parser.statusLine)
				console.log(parser.headers)
				// resolve(data.toString());
				connection.end();
			});

			connection.on('error', (err) => {
				console.log(err)
				reject(err.toString());
				connection.end();
			});
		})
	}
}

class Response {

}

class ResponseParser {
	constructor() {
		this.WAITING_STATUS_LINE = 0;
		this.WAITING_STATUS_LINE_END = 1;
		this.WAITING_HEADER_NAME = 2;
		this.WAITING_HEADER_SPACE = 3;
		this.WAITING_HEADER_VALUE = 4;
		this.WAITING_HEADER_LINE_END = 5;
		this.WAITING_HEADER_BLOCK_END = 6;
		this.WAITING_BODY = 7;

		this.current = this.WAITING_STATUS_LINE;
		this.statusLine = "";
		this.headers = {};
		this.headerName = "";
		this.headerValue = "";
		this.bodyParser = null;
	}
	receive(string) {
		for (let i = 0; i < string.length; i++) {
			this.receiveChar(string.charAt(i))
		}
	}

	receiveChar(char) {
		if (this.current === this.WAITING_STATUS_LINE) {
			if (char === '\r') {
					this.current = this.WAITING_STATUS_LINE_END;
			} 
			if (char === '\n') {
				this.current = this.WAITING_HEADER_NAME;
			} else {
				this.statusLine += char;
			}
		} else if (this.current === this.WAITING_STATUS_LINE_END) {
			if (char === '\n') {
				this.current = this.WAITING_HEADER_NAME;
			}
		} else if (this.current === this.WAITING_HEADER_NAME) {
			if (char === ':') {
				this.current = this.WAITING_HEADER_SPACE;
			} if (char === '\r') {
				this.current = this.WAITING_BODY;
				if (this.headers) {
					this.bodyParser = new TrunkedBodyParser();
				}
			} else {
				this.headerName += char;
			}
		} else if (this.current === this.WAITING_HEADER_SPACE) {
			if (char === ' ') {
				this.current = this.WAITING_HEADER_VALUE;
			}
		} else if (this.current === this.WAITING_HEADER_VALUE) {
			if (char === '\r') {
				this.current = this.WAITING_HEADER_LINE_END;
				this.headers[this.headerName] = this.headerValue;
				this.headerName = '';
				this.headerValue = '';
			} else {
				this.headerValue += char;
			}
		} else if (this.current === this.WAITING_HEADER_LINE_END) {
			if (char === '\n') {
				this.current = this.WAITING_HEADER_NAME;
			}
		}
	}
}

class TrunkedBodyParser {
	constructor() {
		
	}
	receive(string) {

	}
}

void async function () {
	let request = new Request({
		method: 'POST',
		host: '127.0.0.1',
		port: '8088',
		headers: {
			["X-Foo2"]: "customed"
		},
		body: {
			name: 'jhyu',
			uid: 111
		}
	})

	let response = await request.send();
	console.log(response) 
}();


// const client = net.createConnection({ port: 8088, host: "127.0.0.1"}, () => {
//   // 'connect' listener.
//   console.log('connected to server!');

// 	console.log(request.toString())
// 	client.write(request.toString())
// });
// client.on('data', (data) => {
//   console.log(data.toString());
//   client.end();
// });
// client.on('end', () => {
//   console.log('disconnected from server');
// });