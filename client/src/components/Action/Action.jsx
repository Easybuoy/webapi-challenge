import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Action = props => {
  const { id, notes, description } = props.action;
  return (
    <div className="Project">
      <h3>{notes}</h3>
      <strong>{description}</strong>

      <div className="actions">
        <button
          onClick={() => {
            props.deleteAction(id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

Action.defaultProps = {
  action: {}
};

export default Action;

Action.propTypes = {
  action: PropTypes.object.isRequired,
  deleteAction: PropTypes.func.isRequired
};
