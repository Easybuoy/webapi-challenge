import React, { Component } from "react";
import axios from "axios";
import Project from "./Project";

class ProjectsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      error: ""
    };
  }
  componentDidMount() {
    this.getProjects();
  }

  getProjects = () => {
    axios
      .get("http://localhost:3300/api/projects/")
      .then(res => this.setState({ projects: res.data.data }))
      .catch(err => this.setState({ error: err.message }));
  };
  
  deleteProject = id => {
    if (window.confirm("Are you sure you want to delete this project")) {
      axios
        .delete(`http://localhost:3300/api/projects/${id}`)
        .then(res => this.getProjects())
        .catch(err => this.setState({ error: err.message }));
    }
  };

  render() {
    return (
      <div className="Projects">
        <h1>Projects</h1>

        {this.state.projects.map(project => {
          return (
            <Project
              project={project}
              key={project.id}
              deleteProject={this.deleteProject}
            />
          );
        })}
      </div>
    );
  }
}

ProjectsList.defaultProps = {
  projects: []
};

export default ProjectsList;
