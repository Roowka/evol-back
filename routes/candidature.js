const candidatureController = require("../controllers/candidatureController");
var express = require("express");
var router = express.Router();

router.get("/", candidatureController.GetCandidature);

router.get("/:id", candidatureController.GetCandidatureById);

router.post("/", candidatureController.CreateCandidature);

router.put("/:id", candidatureController.UpdateCandidature);

router.delete("/:id", candidatureController.DeleteCandidature);

module.exports = router;
