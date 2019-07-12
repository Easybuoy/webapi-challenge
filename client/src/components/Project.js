import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Project = props => {
  const { id, name, description } = props.project;
  return (
    <div className="Smurf">
      <h3>{name}</h3>
      <strong>{description} tall</strong>

      <div className="actions">
        <button
          onClick={() => {
            props.deleteSmurf(id);
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
  height: "",
  age: ""
};

export default Project;

// Smurf.propTypes = {
//   id: PropTypes.number.isRequired,
//   name: PropTypes.string.isRequired,
//   age: PropTypes.string.isRequired,
//   height: PropTypes.string.isRequired,
//   deleteSmurf: PropTypes.func.isRequired
// };
