import { Request, Response } from "express";
import UserRepository from "../../infra/http/database/repositories/user-repository";
import CreateUserUseCase from "./show-user-usecase";

export default class ShowUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { document, birthDate } = request.body;

    const userRepository = new UserRepository();
    const createUserUseCase = new CreateUserUseCase(userRepository);
    const user = await createUserUseCase.execute({
      document,
      birthDate,
    });

    return response.status(201).json(user);
  }
}
