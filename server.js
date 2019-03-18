const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

app.post('/api/nmap', (req, res) => {
	// Define the expected schema
	const schema = {
		target: Joi.string().required(),
		args: Joi.string().allow('').optional()
	};

	// Validate request against schema
	const result = Joi.validate(req.body, schema);
	if (result.error) {
		res.status(400).send(result.error);
		return;
	}

	const target = req.body.target;
	let args = req.body.args;
	if (args) {
		args = args + " ";
	}

	// Log the request to the server console
	var remoteTarget = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	if (remoteTarget != null && remoteTarget.substr(0, 7) == "::ffff:") {
		remoteTarget = remoteTarget.substr(7)
	}
	var time = new Date().toISOString();

	// Perform the scan
	var nmap = require('child_process').spawnSync(
		'./nmap/scan.sh', [target, args]
	);

	// Send results of scan
	if (nmap.stdout != null) {
		let output = nmap.stdout.toString('utf8');
		if (output.length == 0) {
			console.log(`[${time}] [${remoteTarget}] nmap ${args}${target}... ❌`);
			res.status(400).send(`Bad request`);
		} else {
			const json = JSON.parse(output);
			let elapsed = json['nmaprun']['runstats']['finished']['@elapsed'];
			console.log(`[${time}] [${remoteTarget}] [${elapsed}s] nmap ${args}${target}... ✔️`);
			res.write(output);
		}
	} else if (nmap.stderr != null) {
		console.log(`[${time}] [${remoteTarget}] nmap ${args}${target}... ❌`);
		res.status(400).send(nmap.stderr.toString('utf8'));
	} else {
		console.log(`[${time}] [${remoteTarget}] nmap ${args}${target}... ❌`);
		res.status(400).send(`error processing scan: nmap ${args}${target}`);
	}
	res.end();
});

app.post('/api/masscan', (req, res) => {
	// Define the expected schema
	const schema = {
		target: Joi.string().required(),
		args: Joi.string().allow('').optional()
	};

	// Validate request against schema
	const result = Joi.validate(req.body, schema);
	if (result.error) {
		res.status(400).send(result.error);
		return;
	}

	const target = req.body.target;
	let args = req.body.args;
	if (args) {
		args = args + " ";
	}

	// Log the request to the server console
	var remoteTarget = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	if (remoteTarget != null && remoteTarget.substr(0, 7) == "::ffff:") {
		remoteTarget = remoteTarget.substr(7)
	}
	var time = new Date().toISOString();

	// Perform the scan
	var masscan = require('child_process').spawnSync(
		'./masscan/scan.sh', [target, args]
	);

	// Send results of scan
	if (masscan.stdout != null) {
		let output = masscan.stdout.toString('utf8');
		if (output.length == 0) {
			console.log(`[${time}] [${remoteTarget}] masscan ${args}${target}... ❌`);
			res.status(400).send(`Bad request`);
		} else {
			// const json = JSON.parse(output);
			// let elapsed = json['nmaprun']['runstats']['finished']['@elapsed'];
			// console.log(`[${time}] [${remoteTarget}] [${elapsed}s] masscan ${args}${target}... ✔️`);
			res.write(output);
		}
	} else if (masscan.stderr != null) {
		console.log(`[${time}] [${remoteTarget}] masscan ${args}${target}... ❌`);
		res.status(400).send(masscan.stderr.toString('utf8'));
	} else {
		console.log(`[${time}] [${remoteTarget}] masscan ${args}${target}... ❌`);
		res.status(400).send(`error processing scan: masscan ${args}${target}`);
	}
	res.end();
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
