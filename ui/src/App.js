import React, { Component } from "react";
import "./App.css";
import ResponsiveAppBar from "./navbar";
import Validate from "./validate";
import Render from "./render";
import Fragment from "./fragment";
import About from "./about";

export class App extends Component {
  state = {
    about: true,
    validate: false,
    render: false,
    fragment: false,
    convert: false,
  };

  navigate = (location) => {
    let newState = {
      about: false,
      validate: false,
      render: false,
      fragment: false,
    };
    if (location) {
      newState[location] = true;
      this.setState(newState);
    }
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <ResponsiveAppBar navigate={this.navigate} />
        </header>
        <div>
          <br />
          <div style={{ display: this.state.validate ? "inline" : "none" }}>
            <Validate />
          </div>
          <div style={{ display: this.state.render ? "inline" : "none" }}>
            <Render />
          </div>
          <div style={{ display: this.state.fragment ? "inline" : "none" }}>
            <Fragment />
          </div>
          <div style={{ display: this.state.about ? "inline" : "none" }}>
            <About />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
