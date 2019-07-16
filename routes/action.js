const express = require("express");

const router = express.Router();

const Action = require("../data/helpers/actionModel");
const {
  validateAction,
  validateProjectId,
  validateActionId
} = require("../middlewares");

/**
 * METHOD: GET
 * ROUTE: /api/actions/
 * PURPOSE: Get all actions
 */
router.get("/", async (req, res) => {
  try {
    const actions = await Action.get();
    if (actions.length > 0) {
      return res.json({ status: "success", data: actions });
    }

    return res
      .status(404)
      .json({ status: "error", message: "Action not found" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Error getting action(s)" });
  }
});

/**
 * METHOD: POST
 * ROUTE: /api/actions/:id/
 * PURPOSE: Create new action for a project
 */
router.post("/:id", validateProjectId, validateAction, async (req, res) => {
  try {
    const { description, notes } = req.body;

    const newAction = await Action.insert({
      project_id: req.project.id,
      description,
      notes
    });
    if (newAction) {
      return res
        .status(201)
        .json({ status: "success", message: "Action Created Successfully" });
    }

    return res.status(500).json({
      status: "error",
      message: "Error creating action for project"
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error creating action for project"
    });
  }
});

/**
 * METHOD: GET
 * ROUTE: /api/actions/:id/
 * PURPOSE: Get single action(s)
 */
router.get("/:id", validateActionId, async (req, res) => {
  try {
    const actions = await Action.get(req.action.id);

    if (actions) {
      return res.json({
        status: "success",
        message: "Action detail gotten successfully",
        data: actions
      });
    }
    return res
      .status(404)
      .json({ status: "error", message: "Action not found" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Error getting action" });
  }
});

/**
 * METHOD: DELETE
 * ROUTE: /api/actions/:id
 * PURPOSE: Delete an action
 */
router.delete("/:id", validateActionId, async (req, res) => {
  try {
    const deletedAction = await Action.remove(req.action.id);

    if (deletedAction === 1) {
      return res.json({
        status: "success",
        message: "Action deleted successfully"
      });
    }
    return res
      .status(500)
      .json({ status: "error", message: "Error deleting action" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Error deleting action" });
  }
});

/**
 * METHOD: PUT
 * ROUTE: /api/actions/:id
 * PURPOSE: Update an action
 */
router.put("/:id", validateActionId, validateAction, async (req, res) => {
  try {
    const { notes, description } = req.body;

    const updatedAction = await Action.update(req.action.id, {
      notes,
      description
    });

    if (updatedAction) {
      return res.json({
        status: "success",
        message: "Action updated successfully"
      });
    }
    return res
      .status(500)
      .json({ status: "error", message: "Error updating action" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Error updating action" });
  }
});

module.exports = router;
