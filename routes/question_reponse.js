const question_reponseController = require("../controllers/questionReponseController");
var express = require("express");
var router = express.Router();

router.get("/", question_reponseController.GetQuestionReponse);

router.get("/:id", question_reponseController.GetQuestionReponseById);

router.post("/", question_reponseController.CreateQuestionReponse);

router.put("/:id", question_reponseController.UpdateQuestionReponse);

router.delete("/:id", question_reponseController.DeleteQuestionReponse);

module.exports = router;
