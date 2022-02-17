require("dotenv").config();
const debug = require("debug")("calculator:root");
const { program } = require("commander");
const http = require("http");
const { suma, resta, multiplicacion, division } = require("./utils");

const server = http.createServer();
const portDefault = process.env.SERVER_PORT || 3002;

program.option("--port <number>");

program.parse();

let { port } = program.opts();

if (port === undefined) {
  port = portDefault;
}

server.listen(port, () => {
  debug(`Server is up in http://localhost:${port}`);
});

server.on("request", (request, response) => {
  debug(`Resquest arrived at ${request.url} with method ${request.method}`);

  const urlCalculator = new URL(`http://localhost:${port}${request.url}`);
  const variables = [];
  urlCalculator.searchParams.forEach((variable) => {
    variables.push(variable);
  });

  const a = variables[0];
  const b = variables[1];

  const resultadoSuma = suma(a, b);
  const resultadoResta = resta(a, b);
  const resultadoMultiplicacion = multiplicacion(a, b);
  const resultadoDivision = division(a, b);

  if (urlCalculator.pathname !== "/calculator") {
    response.statusCode = 404;
    response.write("<h1>not found</h1>");
  } else if (variables.length < 2) {
    response.statusCode = 404;
    response.write(
      "<h1>Please, you have to enter two numbers <br>following the next example: http://localhost:3002/calculator?a=6&b=3 </h1>"
    );
  } else {
    response.statusCode = 200;
    response.write(`<h1>HI! THIS ARE THE RESULTS:</h1><br> 
  <h2>${a}+${b} = ${resultadoSuma},<br>
  ${a}-${b} =${resultadoResta},<br>
  ${a}*${b} = ${resultadoMultiplicacion}<br>
  ${a}/${b} = ${resultadoDivision}</h2>`);
  }
  server.on("error", (error) => {
    debug(`error on server: ${error.name}`);
  });

  response.end();
});
