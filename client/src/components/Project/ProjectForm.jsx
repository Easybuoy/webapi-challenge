import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class ProjectForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      success: false
    };
  }

  async componentDidMount() {
    // const { projectId } = this.props.match.params;
    // let smurfData = await axios.get("http://localhost:3333/smurfs");
    // if (smurfData.status === 200) {
    //   smurfData = smurfData.data;
    //   let smurf = smurfData.find(
    //     singleSmurf => singleSmurf.id === parseInt(projectId)
    //   );
    //   if (smurf) {
    //     this.setState({
    //       name: smurf.name || "",
    //       age: smurf.age || "",
    //       height: smurf.height || ""
    //     });
    //   }
    // }
  }
  
  addProject = event => {
    event.preventDefault();
    const payload = {
      name: this.state.name,
      description: this.state.description
    };
    axios.post("http://localhost:3300/api/projects/", payload).then(res => {
      this.setState({
        name: "",
        description: "",
        success: true
      });
    });
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  updateProject = e => {
    e.preventDefault();
    const { projectId } = this.props.match.params;

    const payload = {
      name: this.state.name,
      description: this.state.description
    };
    axios
      .put(`http://localhost:3333/smurfs/${projectId}`, payload)
      .then(res => {
        this.setState({
          name: "",
          age: "",
          height: "",
          success: true
        });
      });
  };

  render() {
    if (this.state.success) {
      return <Redirect to="/" />;
    }

    const { projectId } = this.props.match.params;
    let eventText = "Add Project";
    let eventHandler = this.addProject;
    if (projectId) {
      eventText = "Update Project";
      eventHandler = this.updateProject;
    }

    return (
      <div className="SmurfForm">
        <form onSubmit={eventHandler}>
          <input
            onChange={this.handleInputChange}
            placeholder="name"
            value={this.state.name}
            name="name"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="description"
            value={this.state.description}
            name="description"
          />

          <button type="submit">{eventText}</button>
        </form>
      </div>
    );
  }
}

export default ProjectForm;
