const express = require("express");
const fs = require('fs');
const http = require('http');
const https = require('https');
const app = express();
const validate = require("./validate");
const bodyParser = require("body-parser");
const cors = require('cors')
let credentials = null;

if  (fs.existsSync('../certs/ccda.io.key')) {
  privateKey  = fs.readFileSync('../certs/ccda.io.key', 'utf-8');
  certificate = fs.readFileSync('../certs/ccda.io.crt', 'utf-8');
  ca = fs.readFileSync('../certs/ccda.io.ca-bundle', 'utf-8')
  credentials = {key: privateKey, cert: certificate, ca: ca};
}


let now = new Date().toISOString();

let info = {
  schemaVersion:
    "CDA R2.0 from https://github.com/HL7/CDA-core-2.0 (retreived August 2024)",
  schematronVersion:
    "C-CDA R3.0 from https://github.com/HL7/CDA-ccda/tree/master/validation (retreived August 2024)",
  limitations:
    'This validation does not perform complete vocabulary checks and is based on schema/schematron above. THE SOFTWARE AND RESULTS ARE PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE',
  onlineSince: now,
};

let info21 = JSON.parse(JSON.stringify(info))
info21.schematronVersion = 'C-CDA R2.1 with Companion Guide from https://github.com/HL7/CDA-ccda-2.1 and https://github.com/HL7/CDA-ccda-companion'

app.use(cors());

app.use(bodyParser.raw({ inflate: true, limit: "30mb", type: "*/*" }));

app.post("/validate", (req, res, next) => {
  res.json(validate.validate(req.body.toString(), info));
});

app.post("/validate21", (req, res, next) => {
  res.json(validate.validate21(req.body.toString(), info21));
});

app.get("/status", (req, res, next) => {
  res.json(info);
});

var httpServer = http.createServer(app);
let httpsServer;
if (credentials) {
  httpsServer = https.createServer(credentials, app);
}

if (httpsServer) {
  httpServer.listen(80);
  httpsServer.listen(443);
  console.log('listening on HTTP and HTTPS...')
}
else {
  httpServer.listen(8080);
  console.log('HTTPS server not running...Hosting locally on PORT 8080')
}
