import React, { Component } from "react";
import axios from "axios";
import Action from "./Action";

class ActionsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actions: [],
      error: ""
    };
  }
  componentDidMount() {
    this.getActions();
  }

  getActions = () => {
    const { projectId } = this.props.match.params;

    axios
      .get(`http://localhost:3300/api/projects/${projectId}/actions`)
      .then(res => this.setState({ actions: res.data.data }))
      .catch(err => this.setState({ error: err.message }));
  };

    deleteAction = id => {
      if (window.confirm("Are you sure you want to delete this action?")) {
        axios
          .delete(`http://localhost:3300/api/actions/${id}`)
          .then(res => this.getActions())
          .catch(err => this.setState({ error: err.message }));
      }
    };

  render() {
    return (
      <div className="Projects">
        <h1>Projects Actions</h1>

        {this.state.actions.map(action => {
          return (
            <Action
              action={action}
              key={action.id}
                deleteAction={this.deleteAction}
            />
          );
        })}
      </div>
    );
  }
}

ActionsList.defaultProps = {
  actions: []
};

export default ActionsList;
