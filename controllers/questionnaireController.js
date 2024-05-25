const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const GetQuestionnaire = async (req, res) => {
  try {
    const questionnaires = await prisma.questionnaire.findMany();
    res.status(200).json(questionnaires);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const GetQuestionnaireById = async (req, res) => {
  try {
    const questionnaire = await prisma.questionnaire.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.status(200).json(questionnaire);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const CreateQuestionnaire = async (req, res) => {
  try {
    const questionnaire = await prisma.questionnaire.create({
      data: {
        utilisateurId: req.body.utilisateurId,
      },
    });
    res.status(201).json(questionnaire);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const UpdateQuestionnaire = async (req, res) => {
  try {
    const questionnaire = await prisma.questionnaire.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        utilisateurId: req.body.utilisateurId,
      },
    });
    res.status(200).json(questionnaire);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const DeleteQuestionnaire = async (req, res) => {
  try {
    const questionnaire = await prisma.questionnaire.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.status(200).json(questionnaire);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = {
  GetQuestionnaire,
  GetQuestionnaireById,
  CreateQuestionnaire,
  UpdateQuestionnaire,
  DeleteQuestionnaire,
};
