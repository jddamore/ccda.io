# ccda.io
A set of tools for C-CDA validation and display. Initially developed for August 2024 C-CDA Implement-a-thon. If you don't know what C-CDA is, start [here for the US standard](https://hl7.org/cda/us/ccda/index.html).

## Development Status
- Validator (Whole Document): <span style="color:green">✓ working with C-CDA 2.1 & 3.0</span>
- XSLT Stylehseet Renderer: <span style="color:orange">✗ not done</span>
- Fragment Validator: <span style="color:orange">✗ not done</span>
- CDA↔FHIR Highlighter: <span style="color:orange">✗ not done</span> but you can go here for now http://ccda.online
- About Page: <span style="color:green">✓ done</span>

## How to Build and Start Locally

The applications are written in Node.js (JavaScript) and React (Javascript/HTML). You will need to install [NodeJs](https://nodejs.org/en) and npm (Node Package Manager). On first setup, you should run ```npm i``` in the main project directory to install dependencies. If you want to change the React app, you can also install the react development dependencies using npm from the "ui" folder. 

There are two processes to start to host the application. These can both be hosted locally:

1) **OPTIONAL**: API for the validator for C-CDA schema/schematron. Navigate to the "validation" directory and run ```node ./api.js```. Note that you must be in this directory to run the validator due to nested schematron directory references. 
<br/>
2) **REQUIRED**: Web hosting of React App in the primary repository directory. 
  a) If you started the validator API locally, just run ```node ./app.js```
  b) If you skipped hosting an API locally, go to the file in ./build/config.js and change the apiUrl variable to "https://api.ccda.ui" Note that you are still submitting data to a public endpoint in this case, so not appropriate for protected health information. Then run ```node ./app.js```

After starting locally, you can navigate to http://localhost/ to run the application. If you want to add certificates for HTTPS, you will place them in a "certs" folder in main directory and edit references in the app.js and validation/api.js files for the respective filenames. 

## Acknowledgements

The validation engine is highly dependent on work from these two repositories (available as npm packages): 

- [cda-schematron](https://www.npmjs.com/package/cda-schematron)
- [cda-schematron-validator](https://www.npmjs.com/package/cda-schematron-validator)

[Benjamin Flessner](https://github.com/benjaminflessner) has been instrumental in developing the tools to create schematron for C-CDA from the new 3.0 release. The HL7 repositories referenced in this project include: 

-   https://github.com/HL7/CDA-core-2.0 (CDA R2 schema)
-   https://github.com/hl7/CDA-ccda (C-CDA 3.0 version with schematron)
-   https://github.com/HL7/CDA-ccda-2.1 (C-CDA 2.1 version with schematron)

Prior open-source work to be included in the repository: 

- https://github.com/jddamore/cda-fhir-compare
- https://github.com/jddamore/CCDA-fragment-validator
- https://github.com/jddamore/xlst

## Contact

If you want to use this and have any trouble, reach out to John D'Amore ("johnd" at the domain of moreinformatics.com).