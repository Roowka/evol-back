const formationController = require("../controllers/formationController");
var express = require("express");
var router = express.Router();

router.get("/", formationController.GetFormation);

router.get("/:id", formationController.GetFormationById);

router.post("/", formationController.CreateFormation);

router.put("/:id", formationController.UpdateFormation);

router.delete("/:id", formationController.DeleteFormation);

module.exports = router;
