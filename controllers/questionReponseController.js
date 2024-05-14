const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const GetQuestionReponse = async (req, res) => {
  try {
    const questionsReponses = await prisma.questionReponse.findMany();
    res.status(200).json(questionsReponses);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const GetQuestionReponseById = async (req, res) => {
  try {
    const questionReponse = await prisma.questionReponse.findUnique({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(questionReponse);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const CreateQuestionReponse = async (req, res) => {
  try {
    const questionReponse = await prisma.questionReponse.create({
      data: {
        questionnaireId: req.body.questionnaireId,
        question: req.body.question,
        reponse: req.body.reponse,
      },
    });
    res.status(201).json(questionReponse);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const UpdateQuestionReponse = async (req, res) => {
  try {
    const questionReponse = await prisma.questionReponse.update({
      where: {
        id: req.params.id,
      },
      data: {
        questionnaireId: req.body.questionnaireId,
        question: req.body.question,
        reponse: req.body.reponse,
      },
    });
    res.status(200).json(questionReponse);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const DeleteQuestionReponse = async (req, res) => {
  try {
    const questionReponse = await prisma.questionReponse.delete({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(questionReponse);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = {
  GetQuestionReponse,
  GetQuestionReponseById,
  CreateQuestionReponse,
  UpdateQuestionReponse,
  DeleteQuestionReponse,
};
