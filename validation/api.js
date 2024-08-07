const express = require("express");
const app = express();
const validate = require("./validate");
const bodyParser = require("body-parser");
const cors = require('cors')

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

let info21 = info
info21.schematronVersion = 'C-CDA R2.1 with Companion Guide from https://github.com/HL7/CDA-ccda-2.1 and https://github.com/HL7/CDA-ccda-companion'

app.use(cors());

app.use(bodyParser.raw({ inflate: true, limit: "30mb", type: "*/*" }));

app.post("/validate", (req, res, next) => {
  res.json(validate.validate(req.body.toString(), info));
});

app.post("/validate21", (req, res, next) => {
  res.json(validate.validate21(req.body.toString(), info));
});

app.get("/status", (req, res, next) => {
  res.json(info);
});

app.listen(80, () => {
  console.log("Server running on port 80");
});
