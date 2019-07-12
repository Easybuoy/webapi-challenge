import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class SmurfForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      age: "",
      height: "",
      success: false
    };
  }

  async componentDidMount() {
    const { smurfId } = this.props.match.params;

    let smurfData = await axios.get("http://localhost:3333/smurfs");
    if (smurfData.status === 200) {
      smurfData = smurfData.data;
      let smurf = smurfData.find(
        singleSmurf => singleSmurf.id === parseInt(smurfId)
      );
      if (smurf) {
        this.setState({
          name: smurf.name || "",
          age: smurf.age || "",
          height: smurf.height || ""
        });
      }
    }
  }
  addSmurf = event => {
    event.preventDefault();
    // add code to create the smurf using the api
    const payload = {
      name: this.state.name,
      age: this.state.age,
      height: this.state.height
    };
    axios.post("http://localhost:3333/smurfs", payload).then(res => {
      this.setState({
        name: "",
        age: "",
        height: "",
        success: true
      });
    });
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  updateSmurf = e => {
    e.preventDefault();
    const { smurfId } = this.props.match.params;

    const payload = {
      name: this.state.name,
      age: this.state.age,
      height: this.state.height,

    };
    axios.put(`http://localhost:3333/smurfs/${smurfId}`, payload).then(res => {
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

    const { smurfId } = this.props.match.params;
    let eventText = "Add to the village";
    let eventHandler = this.addSmurf;
    if (smurfId) {
      eventText = "Update Smurf";
      eventHandler = this.updateSmurf;
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
            placeholder="age"
            value={this.state.age}
            name="age"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="height"
            value={this.state.height}
            name="height"
          />
          <button type="submit">{eventText}</button>
        </form>
      </div>
    );
  }
}

export default SmurfForm;
