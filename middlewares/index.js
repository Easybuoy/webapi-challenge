function validateAction(req, res, next) {
  const { body } = req;

  if (!body) {
    return res.status(400).json({ message: "missing post data" });
  }

  if (!body.description) {
    return res
      .status(400)
      .json({ message: "missing required description field" });
  }

  if (!body.notes) {
    return res.status(400).json({ message: "missing required notes field" });
  }

  next();
}

async function validateProjectId(req, res, next) {
  const { id } = req.params;
  const project = await Project.get(id);

  if (!project) {
    return res.status(400).json({ message: "invalid project id" });
  }

  req.project = project;
  next();
}

function validateProject(req, res, next) {
  const { body } = req;

  if (!body) {
    return res.status(400).json({ message: "missing user data" });
  }

  if (!body.name) {
    return res.status(400).json({ message: "missing required name field" });
  }

  if (!body.description) {
    return res
      .status(400)
      .json({ message: "missing required description field" });
  }

  next();
}

module.exports = {
  validateAction,
  validateProject,
  validateProjectId
};
