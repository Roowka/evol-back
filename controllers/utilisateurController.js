const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const GetUser = async (req, res) => {
  try {
    const users = await prisma.utilisateur.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const GetUserById = async (req, res) => {
  try {
    const user = await prisma.utilisateur.findUnique({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const CreateUser = async (req, res) => {
  try {
    const user = await prisma.utilisateur.create({
      data: {
        nom: req.body.nom,
        prenom: req.body.prenom,
        mail: req.body.mail,
        identifiant: req.body.identifiant,
        motdepasse: req.body.motdepasse,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const UpdateUser = async (req, res) => {
  try {
    const user = await prisma.utilisateur.update({
      where: {
        id: req.params.id,
      },
      data: {
        nom: req.body.nom,
        prenom: req.body.prenom,
        mail: req.body.mail,
        identifiant: req.body.identifiant,
        motdepasse: req.body.motdepasse,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const DeleteUser = async (req, res) => {
  try {
    const user = await prisma.utilisateur.delete({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = {
  GetUser,
  GetUserById,
  CreateUser,
  DeleteUser,
  UpdateUser,
};
