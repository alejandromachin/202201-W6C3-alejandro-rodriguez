require("dotenv").config();
const debug = require("debug")("calculator:root");
const { program } = require("commander");

program.option("--a <number>");
program.option("--b <number>");

program.parse();

const { a, b } = program.opts();

debug(a);
debug(b);
