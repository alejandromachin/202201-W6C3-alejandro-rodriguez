require("dotenv").config();
const debug = require("debug")("calculator:root");
const { program } = require("commander");
const http = require("http");

const server = http.createServer();
const portDefault = process.env.SERVER_PORT || 3002;

program.option("--port <number>");

program.parse();

let { port } = program.opts();

if (port === undefined) {
  port = portDefault;
}

server.listen(port, () => {
  debug(`Server is up in http://http://localhost:${port}`);
});
