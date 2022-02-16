const variables = require("./index");
const { suma, resta, multiplicacion, division } = require("./utils");

const a = variables[0];
const b = variables[1];

const resultadoSuma = suma(a, b);
const resultadoResta = resta(a, b);
const resultadoMultiplicacion = multiplicacion(a, b);
const resultadoDivision = division(a, b);

module.export = {
  a,
  b,
  resultadoDivision,
  resultadoMultiplicacion,
  resultadoResta,
  resultadoSuma,
};
