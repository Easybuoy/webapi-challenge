import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Project = props => {
  const { id, name, description } = props.project;
  return (
    <div className="Project">
      <h3>{name}</h3>
      <strong>{description}</strong>

      <div className="actions">
        <button
          onClick={() => {
            props.deleteProject(id);
          }}
        >
          Delete
        </button>
        <button>
          <Link to={`/project/${id}`}>Update</Link>
        </button>
      </div>
    </div>
  );
};

Project.defaultProps = {
  name: "",
  description: "",
};

export default Project;

Project.propTypes = {
  project: PropTypes.object.isRequired,
  deleteProject: PropTypes.func.isRequired
};
