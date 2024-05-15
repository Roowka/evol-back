const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const GetEcole = async (req, res) => {
  try {
    const ecoles = await prisma.ecole.findMany();
    res.status(200).json(ecoles);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const GetEcoleById = async (req, res) => {
  try {
    const ecole = await prisma.ecole.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.status(200).json(ecole);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const CreateEcole = async (req, res) => {
  try {
    const ecole = await prisma.ecole.create({
      data: {
        nom: req.body.nom,
        image: req.body.image,
        ville: req.body.ville,
        departement: req.body.departement,
        adresse: req.body.adresse,
        telephone: req.body.telephone,
        mail: req.body.mail,
        identifiant: req.body.identifiant,
        motdepasse: req.body.motdepasse,
      },
    });
    res.status(201).json(ecole);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const UpdateEcole = async (req, res) => {
  try {
    const ecole = await prisma.ecole.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        nom: req.body.nom,
        image: req.body.image,
        ville: req.body.ville,
        departement: req.body.departement,
        adresse: req.body.adresse,
        telephone: req.body.telephone,
        mail: req.body.mail,
        identifiant: req.body.identifiant,
        motdepasse: req.body.motdepasse,
      },
    });
    res.status(200).json(ecole);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const DeleteEcole = async (req, res) => {
  try {
    const ecole = await prisma.ecole.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.status(200).json(ecole);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = {
  GetEcole,
  GetEcoleById,
  CreateEcole,
  UpdateEcole,
  DeleteEcole,
};
