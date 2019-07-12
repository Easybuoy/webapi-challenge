const express = require("express");

const router = express.Router();
const Project = require("../data/helpers/projectModel");
const { validateProject, validateProjectId } = require("../middlewares");
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
 * ROUTE: /api/projects/:id
 * PURPOSE: Delete a project
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
 * ROUTE: /api/projects/:id
 * PURPOSE: Update a project
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

module.exports = router;
