import React, { Component } from "react";

export class Convert extends Component {
  render() {
    return (
      <div>
        Online Highlighter of CDA↔FHIR not yet implemented here{" "}
        <a href="http://ccda.online" target="_blank" rel="noopener noreferrer">
          See online version
        </a>
        <br />
        <br />
        Github repository:{" "}
        <a
          href="https://github.com/jddamore/cda-fhir-compare"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://github.com/jddamore/cda-fhir-compare
        </a>
      </div>
    );
  }
}

export default Convert;
