import React, { Component } from "react";
import xmlChecker from "xmlchecker";
import axios from "axios";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import FormLabel from "@mui/material/FormLabel";
// import FormControlLabel from "@mui/material/FormControlLabel";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import CodeIcon from '@mui/icons-material/Code';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import xmlFormat from "xml-formatter";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/joy/CircularProgress";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

let url = "https://api.ccda.io";
if (window.config.apiUrl) {
  url = window.config.apiUrl;
}

const preStyle = {
  borderColor: "gray",
  borderStyle: "dashed",
  borderWidth: "thin",
  textAlign: "left",
  padding: "5px",
  margin: "10px",
  minHeight: "10vh",
  maxHeight: "60vh",
  overflowY: "scroll",
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export class Fragment extends Component {
  state = {
    content: "",
    v3: true,
    lineCount: 1,
    scrollTop: 0,
    results: {
      schema: null,
      schematron: null,
      info: {},
    },
    showResults: false,
    showModal: false,
    tooltipSchema: "Copy Schema Feedback",
    tooltipSchematron: "Copy Schematron Feedback",
  };

  rows = 50;

  container_style = {
    marginLeft: "10%",
    width: "80%",
    marginRight: "10%",
    float: "left",
    display: "inline",
  };

  editor_style = {
    fontFamily: "lucida console, courier new, courier, monospace",
    fontSize: "14px",
    lineHeight: "18px",
    width: "95%",
  };

  clear = () => {
    this.setState({
      content: "",
      lineCount: 1,
      showResults: false,
      schemaPass: false,
      schematronErrors: 0,
    });
  };

  checkSubmit = () => {
    this.setState({
      showModal: true,
    });
    let passingCheck = false;
    let checkContent = this.state.content;
    if (!this.state.content) {
      alert("No information in textbox");
      this.setState({
        showModal: false,
      });
    } else {
      checkContent = checkContent.trimStart();
      checkContent = checkContent.replaceAll("sdtc:", "");
      if (
        checkContent.slice(0, 8) !== "<section" ||
        checkContent.slice(0, 14) !== "<recordTarget"
      ) {
        alert("XML must begin with <section> or <recordTarget>, otherwise use VALIDATE tab for full XML validation");
        this.setState({
          showModal: false,
        });
      }
      else {
        try {
          xmlChecker.check(checkContent);
          passingCheck = true;
        } catch (error) {
          alert(
            "Not submitting due to invalid XML! XML Parser: " +
              error.name +
              " at " +
              error.line +
              "," +
              error.column +
              ": " +
              error.message
          );
        }
        if (passingCheck) {
          console.log(`sending to ${url}`);
          let editedurl = url;
          if (this.state.v3) {
            editedurl += "/validate";
          } else {
            editedurl += "/validate21";
          }
            axios.post(editedurl, this.state.content).then((res, err) => {
              //console.log(res);
              //console.log(res.data);
              if (err) {
                alert(err);
                this.setState({
                  showModal: false,
                });
              } 
              else if (res.status !== 200) {
                alert('Server unavailable')
                this.setState({
                  showModal: false,
                });
              }
              else {
                if (res.data && res.data.schema && res.data.schematron) {
                  this.setState({
                    results: res.data,
                    schemaPass: res.data.schema.pass,
                    schematronErrors: res.data.schematron.errorCount,
                    showResults: true,
                    showModal: false,
                  });
                } else {
                  alert(`unexpected response: ${JSON.stringify(res.data)}`);
                  this.setState({
                    showModal: false,
                  });
                }
              }
            }).catch(err => {
                alert(err);
                this.setState({
                  showModal: false,
                })
            });
        } else {
          this.setState({
            showModal: false,
          });
        }
      }
    }
  };

  schematron = (event) => {
    // console.log(this.state)
    if (event.target.checked) {
      this.setState({
        v3: true,
      });
    } else {
      this.setState({
        v3: false,
      });
    }
  };

  handleChange = (event) => {
    event.preventDefault();
    let file = event.target.files[0];

    (async () => {
      const fileContent = await file.text();
      let newFormat = xmlFormat(fileContent, {
        indentation: "  ",
        filter: (node) => node.type !== "Comment",
        collapseContent: true,
        lineSeparator: "\n",
      });
      newFormat = newFormat.replace("<?xml -stylesheet", "<?xml-stylesheet");
      let lineCount = newFormat.split("\n").length;
      this.setState({
        content: newFormat,
        lineCount: lineCount,
      });
      event.target.value = "";
    })();
  };

  createLineCount = () => {
    let outarr = [];
    for (var x = 0; x < this.state.lineCount; x++) {
      outarr[x] = x + 1 + ".";
    }
    return outarr.join("\n");
  };

  copyContents = (event) => {
    console.log(event.target);
    if (event.target.id === "schemaCopy") {
      navigator.clipboard.writeText(
        JSON.stringify(this.state.results.schema, null, 2)
      );
    } else {
      navigator.clipboard.writeText(
        JSON.stringify(this.state.results.schematron, null, 2)
      );
    }
    this.setState({
      tooltipSchema: "Copied!",
      tooltipSchematron: "Copied!",
    });
    setTimeout(() => {
      this.setState({
        tooltipSchema: "Copy Schema Feedback",
        tooltipSchematron: "Copy Schematron Feedback",
      })
    }, 3000);
  };

  handleInput = (event) => {
    let lineCount = event.target.value.split("\n").length;
    this.setState({
      content: event.target.value,
      lineCount: lineCount,
    });
  };

  formatXml = (event) => {
    let lineCount = this.state.lineCount;
    let unformatted = this.state.content;
    let formatted = xmlFormat(unformatted, {
      indentation: "  ",
      filter: (node) => node.type !== "Comment",
      collapseContent: true,
      lineSeparator: "\n",
    }); 
    try {
      lineCount = formatted.split("\n").length;
      formatted = formatted.replace("<?xml -stylesheet", "<?xml-stylesheet");
    } catch (err) {
      if (err) alert("unable to formate XML, check syntax");
    }
    if (formatted) {
      this.setState({
        content: formatted,
        lineCount: lineCount,
      });
    }
  };

  matchScroll = (event) => {
    let lineCounter1 = document.getElementById("line1");
    lineCounter1.scrollTop = event.target.scrollTop;
  };

  render() {
    return (
      <div>
        <Grid container>
          <Grid item xs={12}>
            <Box>
              <div style={{ marginBottom: "20px" }}>
                <Button
                  startIcon={<SendIcon />}
                  variant="contained"
                  color="success"
                  style={{ marginRight: "40px", backgroundColor:"#2E8B57" }}
                  onClick={this.checkSubmit}
                >
                  Validate
                </Button>
                <Button
                  startIcon={<CodeIcon />}
                  variant="outlined"
                  component="label"
                  style={{ marginRight: "40px" }}
                  onClick={this.formatXml}
                >
                  Format XML
                </Button>
                <Button
                  startIcon={<DeleteIcon />}
                  color="error"
                  variant="contained"
                  style={{ marginRight: "40px" }}
                  onClick={this.clear}
                >
                  Clear
                </Button>
                Schematron Selection:
                <FormLabel
                  style={{
                    marginLeft: "20px",
                    marginRight: "10px",
                    fontWeight: this.state.v3 ? 100 : 700,
                    color: this.state.v3 ? "lightgray" : "#1976D2",
                  }}
                >
                  2.1
                </FormLabel>
                <Switch
                  color="primary"
                  defaultChecked
                  onChange={this.schematron}
                />
                <FormLabel
                  style={{
                    marginRight: "10px",
                    fontWeight: this.state.v3 ? 700 : 100,
                    color: this.state.v3 ? "#1976D2" : "lightgray",
                  }}
                >
                  3.0
                </FormLabel>
              </div>
              <Grid
                container
                style={{
                  float: "left",
                  display: this.state.showResults ? "block" : "none",
                  width: "100%",
                }}
              >
                <Grid
                  item
                  md={6}
                  xs={12}
                  style={{ float: "left", width: "100%" }}
                >
                  <span
                    style={{
                      color: this.state.schemaPass ? "green" : "red",
                    }}
                  >
                    Schema Results
                  </span>
                  <span
                    style={{
                      color: "green",
                      display: this.state.schemaPass ? "inline" : "none",
                    }}
                  >
                    {" "}
                    ✓
                  </span>
                  <span
                    style={{
                      color: "red",
                      display: this.state.schemaPass ? "none" : "inline",
                    }}
                  >
                    {" "}
                    ✗
                  </span>
                  <Tooltip title={this.state.tooltipSchema}>
                    <IconButton id="schemaCopy" onClick={this.copyContents}>
                      <ContentCopyIcon id="schemaCopy"/>
                    </IconButton>
                  </Tooltip>
                  <pre style={preStyle}>
                    {JSON.stringify(this.state.results.schema, null, 2)}
                  </pre>
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                  style={{ float: "left", width: "100%" }}
                >
                  <span
                    style={{
                      color: this.state.schematronErrors ? "red" : "green",
                    }}
                  >
                    Schematron Results
                  </span>
                  <span
                    style={{
                      color: "green",
                      display: this.state.schematronErrors ? "none" : "inline",
                    }}
                  >
                    {" "}
                    ✓
                  </span>
                  <span
                    style={{
                      color: "red",
                      display: this.state.schematronErrors ? "inline" : "none",
                    }}
                  >
                    {" "}
                    ✗
                  </span>
                  <Tooltip title={this.state.tooltipSchematron}>
                    <IconButton id="schematronCopy" onClick={this.copyContents}>
                      <ContentCopyIcon id="schematronCopy"/>
                    </IconButton>
                  </Tooltip>
                  <pre style={preStyle}>
                    {JSON.stringify(this.state.results.schematron, null, 2)}
                  </pre>
                </Grid>
              </Grid>
              <div style={this.container_style}>
                <textarea
                  id="line1"
                  className="lineCounter"
                  rows={this.rows}
                  style={{ float: "left" }}
                  readOnly
                  value={this.createLineCount(this.state.lineCount)}
                />
                <textarea
                  className="codeArea"
                  rows={this.rows}
                  placeholder="Paste XML which must begin with <section> or <recordTarget>"
                  value={this.state.content}
                  style={this.editor_style}
                  onScroll={this.matchScroll}
                  onChange={this.handleInput}
                  onPaste={this.handlePaste}
                />
              </div>
            </Box>
          </Grid>
          <Grid item xs={12} style={{ marginTop: "50px" }}>
            <div style={{ display: "block", color: "#cccccc" }}>
              This validation does not perform complete vocabulary checks and is
              based on schema/schematron above. THE SOFTWARE AND RESULTS ARE
              PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
              IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
              NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
              HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
              WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
              OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
              DEALINGS IN THE SOFTWARE
            </div>
            <div style={{ color: "#cccccc", marginTop: "20px" }}>
              {JSON.stringify(this.state.results.info)}
            </div>
          </Grid>
        </Grid>
        <Modal
          id="modalLoading"
          open={this.state.showModal}
          onClose={this.handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              style={{ textAlign: "center" }}
            >
              Submitting data...
              <br />
              <CircularProgress />
              <br />
              This window will automatically close when data received
            </Typography>
          </Box>
        </Modal>
      </div>
    );
  }
}

export default Fragment;
