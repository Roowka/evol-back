const questionnaireController = require("../controllers/questionnaireController");
var express = require("express");
var router = express.Router();

router.get("/", questionnaireController.GetQuestionnaire);

router.get("/:id", questionnaireController.GetQuestionnaireById);

router.post("/", questionnaireController.CreateQuestionnaire);

router.put("/:id", questionnaireController.UpdateQuestionnaire);

router.delete("/:id", questionnaireController.DeleteQuestionnaire);

module.exports = router;
