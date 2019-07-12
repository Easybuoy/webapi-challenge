const express = require("express");

const router = express.Router();

const Action = require("../data/helpers/actionModel");
const { validateAction, validateProjectId } = require("../middlewares");
/**
 * METHOD: POST
 * ROUTE: /api/actions/:project_id/
 * PURPOSE: Create new action for a project
 */
router.post(
  "/:project_id",
  validateProjectId,
  validateAction,
  async (req, res) => {
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
  }
);

module.exports = router;
