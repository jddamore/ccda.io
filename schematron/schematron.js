var validator = require('cda-schematron');

var xmlPath = './examples/ccd_header.xml';
var schematronPath = './ccda-3-0.sch';

var fs = require('fs');
var xml = fs.readFileSync(xmlPath).toString();
var schematron = fs.readFileSync(schematronPath).toString();

var results = validator.validate(xml, schematron);
console.log(results);