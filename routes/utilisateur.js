const utilisateurController = require("../controllers/utilisateurController");
var express = require("express");
var router = express.Router();

router.get("/", utilisateurController.GetUser);

router.get("/:id", utilisateurController.GetUserById);

router.post("/", utilisateurController.CreateUser);

router.put("/:id", utilisateurController.UpdateUser);

router.delete("/:id", utilisateurController.DeleteUser);

module.exports = router;
