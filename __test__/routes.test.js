const request = require("supertest");
const bodyParser = require("body-parser");
const app = require("../app");

app.use(bodyParser.json());

describe("Test des routes utilisateur", () => {
  let idUser;
  it("POST /utilisateur doit créer un nouvel utilisateur", async () => {
    const newUser = {
      nom: "Goi",
      prenom: "Lucas",
      mail: "lucasgoi@gmail.com",
      identifiant: "lucasgoi",
      motdepasse: "1234",
    };
    const res = await request(app).post("/utilisateur").send(newUser);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("nom", "Goi");
  });

  it("GET /utilisateur doit renvoyer la liste des utilisateurs", async () => {
    const res = await request(app).get("/utilisateur");
    idUser = res.body[0].id;
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(1);
  });

  it("GET /utilisateur/:id doit renvoyer un utilisateur spécifique", async () => {
    const res = await request(app).get("/utilisateur/" + idUser);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id");
  });

  it("PUT /utilisateur/:id doit modifier un utilisateur", async () => {
    const updatedUser = { nom: "Myers" };
    const res = await request(app)
      .put("/utilisateur/" + idUser)
      .send(updatedUser);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("nom", "Myers");
  });

  it("DELETE /utilisateur/:id doit supprimer un utilisateur", async () => {
    const res = await request(app).delete("/utilisateur/" + idUser);
    expect(res.statusCode).toBe(200);
  });
});

module.exports = app;
