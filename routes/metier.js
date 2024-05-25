const metierController = require("../controllers/metierController");
var express = require("express");
var router = express.Router();

router.get("/", metierController.GetMetier);

router.get("/:id", metierController.GetMetierById);

router.post("/", metierController.CreateMetier);

router.put("/:id", metierController.UpdateMetier);

router.delete("/:id", metierController.DeleteMetier);

module.exports = router;
