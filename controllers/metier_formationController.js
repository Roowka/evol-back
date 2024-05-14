const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const GetMetierFormation = async (req, res) => {
  try {
    const metiers_formations = await prisma.metier_Formation.findMany();
    res.status(200).json(metiers_formations);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const GetMetierFormationById = async (req, res) => {
  try {
    const metier_formation = await prisma.metier_Formation.findUnique({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(metier_formation);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const CreateMetierFormation = async (req, res) => {
  try {
    const metier_formation = await prisma.metier_Formation.create({
      data: {
        nom: req.body.nom,
        image: req.body.image,
      },
    });
    res.status(201).json(metier_formation);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const UpdateMetierFormation = async (req, res) => {
  try {
    const metier_formation = await prisma.metier_Formation.update({
      where: {
        id: req.params.id,
      },
      data: {
        nom: req.body.nom,
        image: req.body.image,
      },
    });
    res.status(200).json(metier_formation);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const DeleteMetierFormation = async (req, res) => {
  try {
    const metier_formation = await prisma.metier_Formation.delete({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(metier_formation);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = {
  GetMetierFormation,
  GetMetierFormationById,
  CreateMetierFormation,
  UpdateMetierFormation,
  DeleteMetierFormation,
};
