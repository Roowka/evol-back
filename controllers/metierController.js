const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const GetMetier = async (req, res) => {
  try {
    const metiers = await prisma.metier.findMany();
    res.status(200).json(metiers);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const GetMetierById = async (req, res) => {
  try {
    const metier = await prisma.metier.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.status(200).json(metier);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const CreateMetier = async (req, res) => {
  try {
    const metier = await prisma.metier.create({
      data: {
        nom: req.body.nom,
        description: req.body.description,
        motscles: req.body.motscles,
      },
    });
    res.status(201).json(metier);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const UpdateMetier = async (req, res) => {
  try {
    const metier = await prisma.metier.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        nom: req.body.nom,
        description: req.body.description,
        motscles: req.body.motscles,
      },
    });
    res.status(200).json(metier);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const DeleteMetier = async (req, res) => {
  try {
    const metier = await prisma.metier.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.status(200).json(metier);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = {
  GetMetier,
  GetMetierById,
  CreateMetier,
  UpdateMetier,
  DeleteMetier,
};
