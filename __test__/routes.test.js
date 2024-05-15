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

module.exports = app;
