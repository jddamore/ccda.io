var xml2json = require("xml2json");
var validator = require("cda-schematron");
const schema = require("./schema-validator");
const pd = require("pretty-data").pd;
const chalk = require('chalk');

var bad_xmlPath = "./examples/v3bad.xml";
var good_xmlPath = "./examples/v3ccd_header.xml";
var v21_xml = "./examples/v21valid.xml"
var schematronPath = "./ccda-3-0.sch";
var v21schematronPath = './ccda-2-1.sch';

var fs = require("fs");
var bad_xml = fs.readFileSync(bad_xmlPath).toString();
var good_xml = fs.readFileSync(good_xmlPath).toString();
var v21good_xml = fs.readFileSync(v21_xml).toString();
var schematron = fs.readFileSync(schematronPath).toString();
var v21schematron = fs.readFileSync(v21schematronPath).toString();

// edit schematron by replacing variables with actual codes
let schematron_json = JSON.parse(xml2json.toJson(schematron));
let schematron_variables = {};
for (let i = 0; i < schematron_json.schema.let.length; i++) {
  schematron_variables[schematron_json.schema.let[i].name] =
  schematron_json.schema.let[i].value;
}

for (let key in schematron_variables) {
  if (schematron_variables.hasOwnProperty(key)) {
    // console.log(key);
    schematron = schematron.replaceAll(`$${key}`, schematron_variables[key]);
  }
}

// fs.writeFileSync('./new.sch', schematron);

// check happy path
console.log("testing a good 3.0 xml ccd")
let schema_results = schema(good_xml);
let schematron_results = validator.validate(good_xml, schematron);
console.log(
  pd.json({
    schema: schema_results,
    schematron: schematron_results,
  })
);

if (schema_results.pass !== true || schematron_results.errors.length || schematron_results.warnings.length) {
  console.log(chalk.red('happy path 3.0 failed'));
  throw ('happy 3.0 failure');
}

console.log("testing a good 2.1 xml ccd")
schema_results = schema(good_xml);
schematron_results = validator.validate(v21good_xml, v21schematron);
console.log(
  pd.json({
    schema: schema_results,
    schematron: schematron_results,
  })
);

if (schema_results.pass !== true || schematron_results.errors.length || schematron_results.warnings.length) {
  console.log(chalk.red('happy path 2.1 failed'));
  throw ('happy 2.1 failure');
}

// check unhappy path
console.log("testing a bad 3.0 xml ccd")
schema_results = schema(bad_xml);
schematron_results = validator.validate(bad_xml, schematron);
console.log(
  pd.json({
    schema: schema_results,
    schematron: schematron_results,
  })
);

if (schema_results.pass !== false || !schematron_results.errors.length) {
  console.log(chalk.red('unhappy path 3.0 failed'));
  throw ('unhappy 3.0 failure');
}
else {
  console.log(chalk.green("PASSING CHECKS: Happy and unhappy tests passing!"))
}

// Note that server info is defined in api.js 
exports.validate = function (xml, info) {
  let schema_results = schema(xml);
  let schematron_results = validator.validate(xml, schematron);
  return {
      schema: schema_results,
      schematron: schematron_results, 
      info: info
    }
};

exports.validate21 = function (xml, info) {
  let schema_results = schema(xml);
  let schematron_results = validator.validate(xml, v21schematron);
  schematron_results.ignored.push({test: "CONF:1198-32934 through 1198-32946", type: "error"})
  schematron_results.ignored.push({test: "1098-32775", type: "warning"})
  return {
      schema: schema_results,
      schematron: schematron_results, 
      info: info
    }
};
