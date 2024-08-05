import React, { Component } from "react";
import Textarea from "@mui/joy/Textarea";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";

export class Validate extends Component {
  state = {
    content: ''
  }
  
  style = {
    marginLeft: "10%",
    marginRight: "10%",
  };

  clear = () => {
    this.setState({
      content: ''
    })
  }

  handleChange = (event) => {
    event.preventDefault();
    let file = event.target.files[0];
    let data = new FormData();
    data.append("file", file);

    (async () => {
      const fileContent = await file.text();
      this.setState({
        content: fileContent
      });
    })();
  };

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
        </div>
        <Textarea
          maxRows={30}
          placeholder="Paste XML (or click 'upload from file')"
          style={this.style}
          value = {this.state.content}
        />
      </div>
    );
  }
}

export default Validate;
