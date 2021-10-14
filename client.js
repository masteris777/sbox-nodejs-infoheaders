const http = require("http");

const options = {
	hostname: "localhost",
	port: 3000,
	path: "/1",
	method: "GET",
};

const req = http.request(options, (res) => {
	console.log(`${res.statusCode} ${res.statusMessage}`);

	res.on("data", (d) => {
		process.stdout.write(d);
	});
	res.on("end", (d) => {
		process.stdout.write("\n");
	});
});

req.on("information", function (res) {
	console.log(`${res.statusCode} ${res.statusMessage}`);
});

req.on("error", (error) => {
	console.error(error);
});

req.end();
