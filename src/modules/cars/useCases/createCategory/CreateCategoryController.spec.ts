import request from "supertest";
import { hash } from "bcrypt";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";
import { Connection } from "typeorm";

let connection: Connection;

describe("CreateCategoryController", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash("admin", 8);

    await connection.query(`INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license ) 
    values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'AZZ-1100')
  `);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be defined", () => {
    expect(true).toBe(true);
  });

  it("should be able to create a category", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "teste",
        description: "teste",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(201);
  });

  it("should not be able to create a category without token", async () => {
    const response = await request(app).post("/categories").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });

    expect(response.status).toBe(401);
  });

  it("should not be able to create a category with invalid token", async () => {
    const response = await request(app)
      .post("/categories")
      .send({
        name: "teste",
        description: "teste",
      })
      .set({
        Authorization: `Bearer invalid-token`,
      });

    expect(response.status).toBe(401);
  });

  it("should not be able to create a category with name exists", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });

    const { token } = responseToken.body;
    const response = await request(app)
      .post("/categories")
      .send({
        name: "teste",
        description: "teste",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(400);
  });
});
