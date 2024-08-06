import React, { Component, useRef} from "react";
import Textarea from "@mui/joy/Textarea";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import FormLabel from "@mui/material/FormLabel";
// import FormControlLabel from "@mui/material/FormControlLabel";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import xmlFormat from "xml-formatter";

export class Validate extends Component {

  state = {
    content: "",
    v3: true,
    lineCount: 1,
    scrollTop: 0
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
    width: "95%"
  }

  clear = () => {
    this.setState({
      content: "",
      lineCount: 1,
    });
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
    let data = new FormData();
    data.append("file", file);

    (async () => {
      const fileContent = await file.text();
      let newFormat = xmlFormat(fileContent, {
        indentation: "  ",
        filter: (node) => node.type !== "Comment",
        collapseContent: true,
        lineSeparator: "\n",
      });
      let lineCount = newFormat.split("\n").length;
      this.setState({
        content: newFormat,
        lineCount: lineCount,
      });
    })();
  };

  createLineCount = () => {
    let outarr = new Array();
    for (var x = 0; x < this.state.lineCount; x++) {
      outarr[x] = x + 1 + ".";
    }
    return outarr.join("\n");
  };

  matchScroll = (event) => {
    let lineCounter1 = document.getElementById('line1');
    lineCounter1.scrollTop = event.target.scrollTop 
  }

  render() {
    return (
      <div>
        <div style={{ marginBottom: "20px" }}>
          <Button
            startIcon={<SendIcon />}
            variant="contained"
            style={{ marginRight: "40px" }}
          >
            Validate
          </Button>
          <Button
            startIcon={<DriveFolderUploadIcon />}
            variant="contained"
            component="label"
            style={{ marginRight: "40px" }}
          >
            Upload from File
            <input type="file" hidden onChange={this.handleChange} />
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
          <Switch color="primary" defaultChecked onChange={this.schematron} />
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
            placeholder="Paste XML (or click 'upload from file')"
            value={this.state.content}
            style={this.editor_style}
            onScroll={this.matchScroll}
          />
        </div>
      </div>
    );
  }
}

export default Validate;
