const ecoleController = require("../controllers/ecoleController");
var express = require("express");
var router = express.Router();

router.get("/", ecoleController.GetEcole);

router.get("/:id", ecoleController.GetEcoleById);

router.post("/", ecoleController.CreateEcole);

router.put("/:id", ecoleController.UpdateEcole);

router.delete("/:id", ecoleController.DeleteEcole);

module.exports = router;
