import { Request, Response } from "express";
import UserRepository from "../../infra/http/database/repositories/user-repository";
import BCryptHashProvider from "../../providers/hash-provider/implementations/bcrypt-hash-provider";
import CreateUserUseCase from "./create-user-usecase";

export default class CreateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const user = request.body;

    const userRepository = new UserRepository();
    const hashProvider = new BCryptHashProvider();
    const createUserUseCase = new CreateUserUseCase(
      userRepository,
      hashProvider
    );
    const createdUser = await createUserUseCase.execute({ user });

    return response.status(201).json(createdUser);
  }
}
