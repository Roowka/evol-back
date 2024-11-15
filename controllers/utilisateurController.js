const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

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
        id: parseInt(req.params.id),
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
    const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
    const hashedPassword = await bcrypt.hash(req.body.motdepasse, saltRounds);

    const user = await prisma.utilisateur.create({
      data: {
        nom: req.body.nom,
        prenom: req.body.prenom,
        mail: req.body.mail,
        identifiant: req.body.identifiant,
        motdepasse: hashedPassword,
        age: req.body.age,
        sexe: req.body.sexe,
        tel: req.body.tel,
        adresse: req.body.adresse,
        ville: req.body.ville,
        cp: req.body.cp,
        pays: req.body.pays,
        photo: req.body.photo,
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
        id: parseInt(req.params.id),
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
        id: parseInt(req.params.id),
      },
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const LoginUser = async (req, res) => {
  try {
    const user = await prisma.utilisateur.findUnique({
      where: { mail: req.body.email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.motdepasse
    );

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

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
  LoginUser,
};
