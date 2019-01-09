const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

app.post('/api/nmap', (req, res) => {
	// Define the expected schema
	const schema = {
		ip: Joi.string().required(),
		args: Joi.string().allow('').optional()
	};

	// Validate request against schema
	const result = Joi.validate(req.body, schema);
	if (result.error) {
		res.status(400).send(result.error);
		return;
	}

	const ip = req.body.ip;
	let args = req.body.args;
	if (args) {
		args = args + " ";
	}

	// Log the request to the server console
	var remoteIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	if (remoteIP.substr(0, 7) == "::ffff:") {
 		remoteIP = remoteIP.substr(7)
	}
	var time = new Date().toISOString();
	process.stdout.write(`[${time}] [${remoteIP}] nmap ${args}${ip}... `);

	// Perform the scan
	var nmap = require('child_process').spawnSync(
		'./nmap/scan.sh', [ip, args]
	);

	// Send results of scan
	if (nmap.stdout != null) {
		console.log('✔');
		res.write(nmap.stdout.toString('utf8'));
	} else if (nmap.stderr != null) {
		console.log('✖️');
		res.status(400).send(nmap.stderr.toString('utf8'));
	} else {
		console.log('✖️');
		res.status(400).send(`error processing scan: nmap ${args}${ip}`);
	}
	res.end();
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
