import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";
import ProjectForm from "./components/Project/ProjectForm";
import Smurfs from "./components/Project/ProjectsList";
import Navbar from "./components/Navbar";
import ActionsList from "./components/Action/ActionsList";

class App extends Component {
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Route exact path="/" component={Smurfs} />
          <Route exact path="/project-form" component={ProjectForm} />
          <Route exact path="/project/:projectId" component={ProjectForm} />
          <Route exact path="/action/:projectId" component={ActionsList} />
        </div>
      </Router>
    );
  }
}

export default App;
