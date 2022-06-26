import { AppError } from "@shared/err/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

describe("AuthenticateUserUseCase", () => {
  let authenticateUserUseCase: AuthenticateUserUseCase;
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let createUserUseCase: CreateUserUseCase;

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be defined", () => {
    expect(authenticateUserUseCase).toBeDefined();
  });

  it("should be able to authenticate a user", async () => {
    const user: ICreateUserDTO = {
      name: "John Doe",
      email: "teste@teste.com",
      password: "123456",
      driver_license: "123456789",
    };

    await createUserUseCase.execute(user);

    const response = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(response).toHaveProperty("token");
  });

  it("should not be able to authenticate a user with invalid email", async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "fakeEmail@teste.com",
        password: "123456",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate a user with invalid password", async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: "John Doe",
        email: "teste@teste.com",
        password: "123456",
        driver_license: "123456789",
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "fakePassword",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
