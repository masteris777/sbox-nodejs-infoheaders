const express = require("express");
const app = express();
const port = 3000;
const config = require("./config.json");

app.get("/:id", async (req, res) => {
	const promise = getResource(req.params.id);

	do {
		res.writeProcessing();
	} while (
		!(await Promise.race([
			promise,
			timeout(config.PROCESSING_HEADER_PERIOD_MS, false),
		]))
	);

	res.json(await promise);
});

const cache = {};
function getResource(id) {
	return (cache[id] = cache[id] || fetchResource(id));
}

async function fetchResource(id) {
	await timeout(config.PROCESSING_TIME_MS);
	return {
		id,
		report: "hello world",
	};
}

app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`);
});

async function timeout(t, result) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(result);
		}, t);
	});
}

// function writeProcessing(res, expectedTime) {
// 	const eta = Math.round((expectedTime - Date.now()) / 1000);

// 	res._writeRaw("HTTP/1.1 102 Processing\r\n");
// 	res._writeRaw(`eta: ${eta}\r\n`);
// 	res._writeRaw("\r\n");
// }
