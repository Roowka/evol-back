const metier_formationController = require("../controllers/metier_formationController");
var express = require("express");
var router = express.Router();

router.get("/", metier_formationController.GetMetierFormation);

router.get("/:id", metier_formationController.GetMetierFormationById);

router.post("/", metier_formationController.CreateMetierFormation);

router.put("/:id", metier_formationController.UpdateMetierFormation);

router.delete("/:id", metier_formationController.DeleteMetierFormation);

module.exports = router;
