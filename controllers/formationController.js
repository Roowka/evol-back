const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const GetFormation = async (req, res) => {
  try {
    const formations = await prisma.formation.findMany();
    res.status(200).json(formations);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const GetFormationById = async (req, res) => {
  try {
    const formation = await prisma.formation.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.status(200).json(formation);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const CreateFormation = async (req, res) => {
  try {
    const formation = await prisma.formation.create({
      data: {
        ecoleId: req.body.ecoleId,
        nom: req.body.nom,
        titrerncp: req.body.titrerncp,
        description: req.body.description,
        imageurl: req.body.imageurl,
        motscles: req.body.motscles,
      },
    });
    res.status(201).json(formation);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const UpdateFormation = async (req, res) => {
  try {
    const formation = await prisma.formation.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        ecoleId: req.body.ecoleId,
        nom: req.body.nom,
        titrerncp: req.body.titrerncp,
        description: req.body.description,
        imageurl: req.body.imageurl,
        motscles: req.body.motscles,
      },
    });
    res.status(200).json(formation);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const DeleteFormation = async (req, res) => {
  try {
    const formation = await prisma.formation.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.status(200).json(formation);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = {
  GetFormation,
  GetFormationById,
  CreateFormation,
  UpdateFormation,
  DeleteFormation,
};
