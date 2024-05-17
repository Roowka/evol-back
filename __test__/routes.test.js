const request = require("supertest");
const bodyParser = require("body-parser");
const app = require("../app");

app.use(bodyParser.json());

describe("Test des routes utilisateur", () => {
  let idUtilisateur;
  it("POST /utilisateur doit créer un nouvel utilisateur", async () => {
    const newUtilisateur = {
      nom: "Goi",
      prenom: "Lucas",
      mail: "lucasgoi@gmail.com",
      identifiant: "lucasgoi",
      motdepasse: "1234",
    };
    const res = await request(app).post("/utilisateur").send(newUtilisateur);
    idUtilisateur = res.body.id;
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("nom", "Goi");
  });

  it("GET /utilisateur doit renvoyer la liste des utilisateurs", async () => {
    const res = await request(app).get("/utilisateur");
    expect(res.statusCode).toBe(200);
  });

  it("GET /utilisateur/:id doit renvoyer un utilisateur spécifique", async () => {
    const res = await request(app).get("/utilisateur/" + idUtilisateur);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id");
  });

  it("PUT /utilisateur/:id doit modifier un utilisateur", async () => {
    const updatedUtilisateur = { nom: "Myers" };
    const res = await request(app)
      .put("/utilisateur/" + idUtilisateur)
      .send(updatedUtilisateur);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("nom", "Myers");
  });

  it("DELETE /utilisateur/:id doit supprimer un utilisateur", async () => {
    const res = await request(app).delete("/utilisateur/" + idUtilisateur);
    expect(res.statusCode).toBe(200);
  });
});

//-------------------------------------------------------------

describe("Test des routes candidature", () => {
  let idUtilisateur;
  let idEcole;
  let idCandidature;
  beforeAll(async () => {
    const newUtilisateur = {
      nom: "Test",
      prenom: "Toto",
      mail: "Toto@gmail.com",
      identifiant: "iamtoto",
      motdepasse: "1234",
    };
    const resUtilisateur = await request(app)
      .post("/utilisateur")
      .send(newUtilisateur);
    idUtilisateur = resUtilisateur.body.id;

    const newEcole = {
      nom: "MyDigitalSchool",
      ville: "Annecy",
      departement: "Haute-Savoie",
      adresse: "3 rue de la Paix",
      telephone: "0606060606",
      mail: "MyDigitalSchool@gmail.com",
      identifiant: "iammyschool",
      motdepasse: "1234",
    };
    const resEcole = await request(app).post("/ecole").send(newEcole);
    idEcole = resEcole.body.id;
  });

  it("POST /candidature doit créer une nouvelle candidature", async () => {
    const newCandidature = {
      autheurId: idUtilisateur,
      ecoleId: idEcole,
      texte: "Je suis une nouvelle candidature",
    };
    const res = await request(app).post("/candidature").send(newCandidature);
    idCandidature = res.body.id;
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty(
      "texte",
      "Je suis une nouvelle candidature"
    );
  });

  it("GET /candidature doit renvoyer la liste des candidatures", async () => {
    const res = await request(app).get("/candidature");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(1);
  });

  it("GET /candidature/:id doit renvoyer une candidature spécifique", async () => {
    const res = await request(app).get("/candidature/" + idCandidature);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id");
  });

  it("PUT /candidature/:id doit modifier un candidature", async () => {
    const updatedCandidature = { texte: "Ceci est un texte modifié" };
    const res = await request(app)
      .put("/candidature/" + idCandidature)
      .send(updatedCandidature);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("texte", "Ceci est un texte modifié");
  });

  it("DELETE /candidature/:id doit supprimer un candidature", async () => {
    const res = await request(app).delete("/candidature/" + idCandidature);
    expect(res.statusCode).toBe(200);
  });

  afterAll(async () => {
    await request(app).delete("/utilisateur/" + idUtilisateur);
    await request(app).delete("/ecole/" + idEcole);
  });
});

//-------------------------------------------------------------

describe("Test des routes ecole", () => {
  let idEcole;
  it("POST /ecole doit créer une nouvelle ecole", async () => {
    const newEcole = {
      nom: "MyDigitalSchool",
      ville: "Annecy",
      departement: "Haute-Savoie",
      adresse: "3 rue de la Paix",
      telephone: "0606060606",
      mail: "MyDigitalSchool@gmail.com",
      identifiant: "iammyschool",
      motdepasse: "1234",
    };
    const res = await request(app).post("/ecole").send(newEcole);
    idEcole = res.body.id;
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("nom", "MyDigitalSchool");
  });

  it("GET /ecole doit renvoyer la liste des ecoles", async () => {
    const res = await request(app).get("/ecole");
    expect(res.statusCode).toBe(200);
  });

  it("GET /ecole/:id doit renvoyer une ecole spécifique", async () => {
    const res = await request(app).get("/ecole/" + idEcole);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id");
  });

  it("PUT /ecole/:id doit modifier une ecole", async () => {
    const updatedEcole = { adresse: "4 route des Creuses" };
    const res = await request(app)
      .put("/ecole/" + idEcole)
      .send(updatedEcole);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("adresse", "4 route des Creuses");
  });

  it("DELETE /ecole/:id doit supprimer une ecole", async () => {
    const res = await request(app).delete("/ecole/" + idEcole);
    expect(res.statusCode).toBe(200);
  });
});

//-------------------------------------------------------------

describe("Test des routes formation", () => {
  let idFormation;
  let idEcole;

  beforeAll(async () => {
    const newEcole = {
      nom: "MyDigitalSchool",
      ville: "Annecy",
      departement: "Haute-Savoie",
      adresse: "3 rue de la Paix",
      telephone: "0606060606",
      mail: "MyDigitalSchool@gmail.com",
      identifiant: "iammyschool",
      motdepasse: "1234",
    };
    const resEcole = await request(app).post("/ecole").send(newEcole);
    idEcole = resEcole.body.id;
  });

  it("POST /formation doit créer une nouvelle formation", async () => {
    const newFormation = {
      nom: "MBA Developpeur Web",
      titrerncp: "12BIS",
      description: "Super formation",
      imageurl: "image.com",
      motscles: ["developpeur", "web"],
      ecoleId: idEcole,
    };
    const res = await request(app).post("/formation").send(newFormation);
    idFormation = res.body.id;
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("nom", "MBA Developpeur Web");
  });

  it("GET /formation doit renvoyer la liste des formations", async () => {
    const res = await request(app).get("/formation");
    expect(res.statusCode).toBe(200);
  });

  it("GET /formation/:id doit renvoyer une formation spécifique", async () => {
    const res = await request(app).get("/formation/" + idFormation);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id");
  });

  it("PUT /formation/:id doit modifier une formation", async () => {
    const updatedFormation = { description: "Incroyable formation" };
    const res = await request(app)
      .put("/formation/" + idFormation)
      .send(updatedFormation);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("description", "Incroyable formation");
  });

  it("DELETE /formation/:id doit supprimer une formation", async () => {
    const res = await request(app).delete("/formation/" + idFormation);
    expect(res.statusCode).toBe(200);
  });

  afterAll(async () => {
    await request(app).delete("/ecole/" + idEcole);
  });
});

//-------------------------------------------------------------

describe("Test des routes métier", () => {
  let idMetier;

  it("POST /metier doit créer un nouveau metier", async () => {
    const newMetier = {
      nom: "Développeur",
      description: "Super métier",
      motscles: ["Travail équipe", "Informatique"],
    };
    const res = await request(app).post("/metier").send(newMetier);
    idMetier = res.body.id;
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("nom", "Développeur");
  });

  it("GET /metier doit renvoyer la liste des metiers", async () => {
    const res = await request(app).get("/metier");
    expect(res.statusCode).toBe(200);
  });

  it("GET /metier/:id doit renvoyer un metier spécifique", async () => {
    const res = await request(app).get("/metier/" + idMetier);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id");
  });

  it("PUT /metier/:id doit modifier un métier", async () => {
    const updatedMetier = { description: "Incroyable métier" };
    const res = await request(app)
      .put("/metier/" + idMetier)
      .send(updatedMetier);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("description", "Incroyable métier");
  });

  it("DELETE /metier/:id doit supprimer un métier", async () => {
    const res = await request(app).delete("/metier/" + idMetier);
    expect(res.statusCode).toBe(200);
  });
});

//-------------------------------------------------------------

describe("Test des routes metier-formation", () => {
  let idMetier;
  let idMetier2;
  let idEcole;
  let idFormation;
  let idMetierFormation;

  beforeAll(async () => {
    const newMetier = {
      nom: "Développeur",
      description: "Super métier",
      motscles: ["Travail équipe", "Informatique"],
    };
    const resMetier = await request(app).post("/metier").send(newMetier);
    idMetier = resMetier.body.id;

    const newMetier2 = {
      nom: "Designer",
      description: "Hyper métier",
      motscles: ["Design", "Informatique"],
    };
    const resMetier2 = await request(app).post("/metier").send(newMetier2);
    idMetier2 = resMetier2.body.id;

    const newEcole = {
      nom: "MyDigitalSchool",
      ville: "Annecy",
      departement: "Haute-Savoie",
      adresse: "3 rue de la Paix",
      telephone: "0606060606",
      mail: "MyDigitalSchool@gmail.com",
      identifiant: "iammyschool",
      motdepasse: "1234",
    };
    const resEcole = await request(app).post("/ecole").send(newEcole);
    idEcole = resEcole.body.id;

    const newFormation = {
      nom: "MBA Developpeur Web",
      titrerncp: "12BIS",
      description: "Super formation",
      imageurl: "image.com",
      motscles: ["developpeur", "web"],
      ecoleId: idEcole,
    };
    const resFormation = await request(app)
      .post("/formation")
      .send(newFormation);
    idFormation = resFormation.body.id;
  });

  it("POST /metier_formation doit créer un nouveau metier_formation", async () => {
    const newMetierFormation = {
      metierId: idMetier,
      formationId: idFormation,
    };
    const res = await request(app)
      .post("/metier_formation")
      .send(newMetierFormation);
    idMetierFormation = res.body.id;
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("metierId", idMetier);
  });

  it("GET /metier_formation doit renvoyer la liste des metiers_formations", async () => {
    const res = await request(app).get("/metier_formation");
    expect(res.statusCode).toBe(200);
  });

  it("GET /metier_formation/:id doit renvoyer un metier_formation spécifique", async () => {
    const res = await request(app).get(
      "/metier_formation/" + idMetierFormation
    );
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id");
  });

  it("PUT /metier_formation/:id doit modifier un metier_formation", async () => {
    const updatedMetierFormation = { metierId: idMetier2 };
    const res = await request(app)
      .put("/metier_formation/" + idMetierFormation)
      .send(updatedMetierFormation);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("metierId", idMetier2);
  });

  it("DELETE /metier_formation/:id doit supprimer un metier_formation", async () => {
    const res = await request(app).delete(
      "/metier_formation/" + idMetierFormation
    );
    expect(res.statusCode).toBe(200);
  });

  afterAll(async () => {
    await request(app).delete("/formation/" + idFormation);
    await request(app).delete("/ecole/" + idEcole);
    await request(app).delete("/metier/" + idMetier);
    await request(app).delete("/metier/" + idMetier2);
  });
});

//-------------------------------------------------------------

describe("Test des routes questionnaire", () => {
  let idQuestionnaire;
  let idUtilisateur;
  let idUtilisateur2;

  beforeAll(async () => {
    const newUtilisateur = {
      nom: "Test",
      prenom: "Toto",
      mail: "Toto@gmail.com",
      identifiant: "iamtoto",
      motdepasse: "1234",
    };
    const resUtilisateur = await request(app)
      .post("/utilisateur")
      .send(newUtilisateur);
    idUtilisateur = resUtilisateur.body.id;

    const newUtilisateur2 = {
      nom: "Skywalker",
      prenom: "Anakin",
      mail: "anakin@gmail.com",
      identifiant: "iamvader",
      motdepasse: "1234",
    };
    const resUtilisateur2 = await request(app)
      .post("/utilisateur")
      .send(newUtilisateur2);
    idUtilisateur2 = resUtilisateur2.body.id;
  });

  it("POST /questionnaire doit créer un nouveau questionnaire", async () => {
    const newQuestionnaire = {
      utilisateurId: idUtilisateur,
    };
    const res = await request(app)
      .post("/questionnaire")
      .send(newQuestionnaire);
    idQuestionnaire = res.body.id;
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("utilisateurId", idUtilisateur);
  });

  it("GET /questionnaire doit renvoyer la liste des questionnaires", async () => {
    const res = await request(app).get("/questionnaire");
    expect(res.statusCode).toBe(200);
  });

  it("GET /questionnaire/:id doit renvoyer un questionnaire spécifique", async () => {
    const res = await request(app).get("/questionnaire/" + idQuestionnaire);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id");
  });

  it("PUT /questionnaire/:id doit modifier un questionnaire", async () => {
    const updatedQuestionnaire = { utilisateurId: idUtilisateur2 };
    const res = await request(app)
      .put("/questionnaire/" + idQuestionnaire)
      .send(updatedQuestionnaire);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("utilisateurId", idUtilisateur2);
  });

  it("DELETE /questionnaire/:id doit supprimer un questionnaire", async () => {
    const res = await request(app).delete("/questionnaire/" + idQuestionnaire);
    expect(res.statusCode).toBe(200);
  });

  afterAll(async () => {
    await request(app).delete("/utilisateur/" + idUtilisateur);
    await request(app).delete("/utilisateur/" + idUtilisateur2);
  });
});

//-------------------------------------------------------------

describe("Test des routes questions/réponses", () => {
  let idQuestionnaire;
  let idUtilisateur;
  let idQuestionReponse;

  beforeAll(async () => {
    const newUtilisateur = {
      nom: "Test",
      prenom: "Toto",
      mail: "Toto@gmail.com",
      identifiant: "iamtoto",
      motdepasse: "1234",
    };
    const resUtilisateur = await request(app)
      .post("/utilisateur")
      .send(newUtilisateur);
    idUtilisateur = resUtilisateur.body.id;

    const newQuestionnaire = {
      utilisateurId: idUtilisateur,
    };
    const res = await request(app)
      .post("/questionnaire")
      .send(newQuestionnaire);
    idQuestionnaire = res.body.id;
  });

  it("POST /question_reponse doit créer un nouveau question_reponse", async () => {
    const newQuestionReponse = {
      questionnaireId: idQuestionnaire,
      question: "Comment tu vas ?",
      reponse: "Bien",
    };
    const res = await request(app)
      .post("/question_reponse")
      .send(newQuestionReponse);
    idQuestionReponse = res.body.id;
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("question", "Comment tu vas ?");
  });

  it("GET /question_reponse doit renvoyer la liste des question_reponses", async () => {
    const res = await request(app).get("/question_reponse");
    expect(res.statusCode).toBe(200);
  });

  it("GET /question_reponse/:id doit renvoyer un question_reponse spécifique", async () => {
    const res = await request(app).get(
      "/question_reponse/" + idQuestionReponse
    );
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id");
  });

  it("PUT /question_reponse/:id doit modifier un question_reponse", async () => {
    const updatedQuestionReponse = { reponse: "Mal" };
    const res = await request(app)
      .put("/question_reponse/" + idQuestionReponse)
      .send(updatedQuestionReponse);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("reponse", "Mal");
  });

  it("DELETE /question_reponse/:id doit supprimer un question_reponse", async () => {
    const res = await request(app).delete(
      "/question_reponse/" + idQuestionReponse
    );
    expect(res.statusCode).toBe(200);
  });

  afterAll(async () => {
    await request(app).delete("/questionnaire/" + idQuestionnaire);
    await request(app).delete("/utilisateur/" + idUtilisateur);
  });
});

module.exports = app;
