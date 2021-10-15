const { setTimeout } = require("timers/promises");
const fetchResource = require("./resource");
const express = require("express");
const config = require("./config.json");

const app = express();
const port = 3000;

app.get("/:id", async (req, res) => {
	const promise = getResource(req.params.id);

	do {
		res.writeProcessing();
	} while (
		!(await Promise.race([
			promise,
			setTimeout(config.PROCESSING_HEADER_PERIOD_MS, false),
		]))
	);

	res.json(await promise);
});

const cache = {};
function getResource(id) {
	return (cache[id] = cache[id] || fetchResource(id));
}

app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`);
});

// function writeProcessing(res, expectedTime) {
// 	const eta = Math.round((expectedTime - Date.now()) / 1000);

// 	res._writeRaw("HTTP/1.1 102 Processing\r\n");
// 	res._writeRaw(`eta: ${eta}\r\n`);
// 	res._writeRaw("\r\n");
// }
