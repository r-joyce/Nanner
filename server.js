const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router();
const middlewares = jsonServer.defaults("readOnly");

server.use(middlewares);
server.get('/api/*', (req, res) => {
	var fs = require('fs');
	ip = req.url.replace("/api/", "");
	var nmap = require('child_process').spawnSync(
		'./scan.sh', [ip]
	);

	if (nmap.stderr != null) {
		console.log(nmap.stderr.toString('utf8'));
	}

	if (nmap.stdout != null) {
		res.write(nmap.stdout.toString('utf8'));
	} else {
		console.log('error processing for: ' + ip);
	}

  res.end();
});

server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
});
