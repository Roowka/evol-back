const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const GetCandidature = async (req, res) => {
  try {
    const candidatures = await prisma.candidature.findMany();
    res.status(200).json(candidatures);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const GetCandidatureById = async (req, res) => {
  try {
    const candidature = await prisma.candidature.findUnique({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(candidature);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const CreateCandidature = async (req, res) => {
  try {
    const candidature = await prisma.candidature.create({
      data: {
        autheurId: req.body.autheurId,
        ecoleId: req.body.ecoleId,
        texte: req.body.texte,
      },
    });
    res.status(201).json(candidature);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const UpdateCandidature = async (req, res) => {
  try {
    const candidature = await prisma.candidature.update({
      where: {
        id: req.params.id,
      },
      data: {
        autheurId: req.body.autheurId,
        ecoleId: req.body.ecoleId,
        texte: req.body.texte,
      },
    });
    res.status(200).json(candidature);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const DeleteCandidature = async (req, res) => {
  try {
    const candidature = await prisma.candidature.delete({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(candidature);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = {
  GetCandidature,
  GetCandidatureById,
  CreateCandidature,
  UpdateCandidature,
  DeleteCandidature,
};
