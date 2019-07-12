const express = require("express");

const router = express.Router();
const Project = require("./data/helpers/projectModel");
const Action = require("./data/helpers/actionModel");

/**
 * METHOD: POST
 * ROUTE: /api/projects/
 * PURPOSE: Create new project
 */
router.post("/", validateProject, async (req, res) => {
  try {
    const { name, description } = req.body;
    const newProject = await Project.insert({ name, description });

    if (newProject) {
      return res
        .status(201)
        .json({ status: "success", message: "Project Created Successfully" });
    }

    return res
      .status(500)
      .json({ status: "error", message: "Error creating project" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Error creating project" });
  }
});

/**
 * METHOD: POST
 * ROUTE: /api/users/:id/posts
 * PURPOSE: Create new post for a user
 */
router.post("/:id/posts", validateProjectId, validatePost, async (req, res) => {
  try {
    const { text } = req.body;

    const newPost = await PostDb.insert({ user_id: req.project.id, text });
    if (newPost) {
      return res
        .status(201)
        .json({ status: "success", message: "Post Created Successfully" });
    }

    return res
      .status(500)
      .json({ status: "error", message: "Error creating post for user" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Error creating post for user" });
  }
});

/**
 * METHOD: GET
 * ROUTE: /api/projects/
 * PURPOSE: Get all projects
 */
router.get("/", async (req, res) => {
  try {
    const project = await Project.get();
    if (project.length > 0) {
      return res.json({ status: "success", data: project });
    }

    return res
      .status(404)
      .json({ status: "error", message: "Project not found" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Error getting project(s)" });
  }
});

/**
 * METHOD: GET
 * ROUTE: /api/projects/:id
 * PURPOSE: Get single project by id
 */
router.get("/:id", validateProjectId, async (req, res) => {
  try {
    return res.json({
      status: "success",
      data: req.project,
      message: "Project gotten successfully"
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Error getting project detail" });
  }
});

/**
 * METHOD: GET
 * ROUTE: /api/users/:id/posts
 * PURPOSE: Get single users post(s)
 */
// router.get("/:id/posts", validateProjectId, async (req, res) => {
//   try {
//     const posts = await UserDb.getUserPosts(req.user.id);
//     if (posts.length > 0) {
//       return res.json({
//         status: "success",
//         message: "User post(s) gotten successfully",
//         data: posts
//       });
//     }
//     return res
//       .status(404)
//       .json({ status: "error", message: "User Post not found" });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ status: "error", message: "Error getting user post(s)" });
//   }
// });

/**
 * METHOD: DELETE
 * ROUTE: /api/users/:id
 * PURPOSE: Delete a user
 */
router.delete("/:id", validateProjectId, async (req, res) => {
  try {
    const deletedProject = await Project.remove(req.project.id);

    if (deletedProject === 1) {
      return res.json({
        status: "success",
        message: "Project deleted successfully"
      });
    }
    return res
      .status(500)
      .json({ status: "error", message: "Error deleting project" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Error deleting project" });
  }
});

/**
 * METHOD: PUT
 * ROUTE: /api/users/:id
 * PURPOSE: Update a user
 */
router.put("/:id", validateProjectId, validateProject, async (req, res) => {
  try {
    const { name, description } = req.body;

    const updatedProject = await Project.update(req.project.id, {
      name,
      description
    });
    if (updatedProject) {
      return res.json({
        status: "success",
        message: "Project updated successfully"
      });
    }
    return res
      .status(500)
      .json({ status: "error", message: "Error updating project" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Error updating project" });
  }
});

//custom middleware

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

function validatePost(req, res, next) {
  const { body } = req;

  if (!body) {
    return res.status(400).json({ message: "missing post data" });
  }

  if (!body.text) {
    return res.status(400).json({ message: "missing required text field" });
  }

  next();
}

module.exports = router;
