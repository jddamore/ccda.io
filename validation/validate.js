var xml2json = require("xml2json");
var validator = require("cda-schematron");
const schema = require("./schema-validator");
const pd = require("pretty-data").pd;
const chalk = require('chalk');

var bad_xmlPath = "./examples/bad.xml";
var good_xmlPath = "./examples/ccd_header.xml";
var schematronPath = "./ccda-3-0.sch";

var fs = require("fs");
var bad_xml = fs.readFileSync(bad_xmlPath).toString();
var good_xml = fs.readFileSync(good_xmlPath).toString();
var schematron = fs.readFileSync(schematronPath).toString();

// edit schematron by replacing variables with actual codes
let schema_json = JSON.parse(xml2json.toJson(schematron));
let schematron_variables = {};
for (let i = 0; i < schema_json.schema.let.length; i++) {
  schematron_variables[schema_json.schema.let[i].name] =
    schema_json.schema.let[i].value;
}

for (let key in schematron_variables) {
  if (schematron_variables.hasOwnProperty(key)) {
    // console.log(key);
    schematron = schematron.replaceAll(`$${key}`, schematron_variables[key]);
  }
}

// fs.writeFileSync('./new.sch', schematron);

// check happy path
console.log("testing a good xml ccd")
let schema_results = schema(good_xml);
let schematron_results = validator.validate(good_xml, schematron);
console.log(
  pd.json({
    schema: schema_results,
    schematron: schematron_results,
  })
);

if (schema_results.pass !== true || schematron_results.errors.length) {
  console.log(chalk.red('happy path failed'));
  throw ('happy failure');
}

// check unhappy path
console.log("testing a bad xml ccd")
schema_results = schema(bad_xml);
schematron_results = validator.validate(bad_xml, schematron);
console.log(
  pd.json({
    schema: schema_results,
    schematron: schematron_results,
  })
);

if (schema_results.pass !== false || !schematron_results.errors.length) {
  console.log(chalk.red('unhappy path failed'));
  throw ('unhappy failure');
}
else {
  console.log(chalk.green("PASSING CHECKS: Happy and unhappy test passing!"))
}

// Note that server info is defined in api.js 
module.exports = function (xml, info) {
  let schema_results = schema(xml);
  let schematron_results = validator.validate(xml, schematron);
  return {
      schema: schema_results,
      schematron: schematron_results, 
      info: info
    }
};
