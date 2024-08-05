var xml2json = require('xml2json');
var validator = require('cda-schematron');

var xmlPath = './examples/bad.xml';
var schematronPath = './ccda-3-0.sch';

var fs = require('fs');
var xml = fs.readFileSync(xmlPath).toString();
var schematron = fs.readFileSync(schematronPath).toString();

// edit schematron by replacing variables with actual codes
let schema_json = JSON.parse(xml2json.toJson(schematron));
let schematron_variables = {}
for (let i = 0; i < schema_json.schema.let.length; i++) {
  schematron_variables[schema_json.schema.let[i].name] = schema_json.schema.let[i].value 
}

for (let key in schematron_variables) {
  if (schematron_variables.hasOwnProperty(key)) {
    // console.log(key);
    schematron = schematron.replaceAll(`$${key}`, schematron_variables[key])
  }
}

// fs.writeFileSync('./new.sch', schematron);

var results = validator.validate(xml, schematron);
console.log(results);