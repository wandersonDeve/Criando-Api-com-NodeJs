import { inject, injectable } from "tsyringe";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import { AppError } from "@shared/err/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IReponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IReponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email or password incorrect");
    }

    const passwordMath = await compare(password, user.password);

    if (!passwordMath) {
      throw new AppError("Email or password incorrect");
    }

    const token = sign({}, "teste", {
      subject: user.id,
      expiresIn: "1d",
    });

    const tokenReponse: IReponse = {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    };

    return tokenReponse;
  }
}

export { AuthenticateUserUseCase };
