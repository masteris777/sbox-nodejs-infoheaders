const { setTimeout } = require("timers/promises");
const config = require("./config.json");
module.exports = async (id) => {
	await setTimeout(config.PROCESSING_TIME_MS);
	return {
		id,
		report: "hello world",
	};
};
