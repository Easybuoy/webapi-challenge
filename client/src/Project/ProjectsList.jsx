import React, { Component } from "react";
import Project from "./Project";

export default class ProjectsList extends Component {
  state = { projects: [], error: "" };
  componentDidMount() {
    fetch("http://localhost:3300/api/projects/")
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => this.setState({ error: err.message }));
  }
  render() {
    return <div>Projects</div>;
  }
}
