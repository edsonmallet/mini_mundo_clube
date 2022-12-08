import AppError from "@/shared/errors/app-error";
import { ICreateUserDTO } from "../../dtos/icreate-user-dto";
import { IUser } from "../../infra/http/database/entities/user";
import IHashProvider from "../../providers/hash-provider/models/ihashprovider";
import { IUserRepository } from "../../repositories/iuser-repository";

interface IRequest {
  user: ICreateUserDTO;
}

type Response = IUser;

export default class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private hashProvider: IHashProvider
  ) {}

  public async execute({ user }: IRequest): Promise<Response> {
    if (!user) {
      throw new AppError("User is empty");
    }

    if (user.email) {
      const exists = await this.userRepository.findUserByField(
        "email",
        user.email
      );
      if (exists) {
        throw new AppError("Email already exists");
      }
    }

    if (user.document) {
      const exists = await this.userRepository.findUserByField(
        "document",
        user.document
      );
      if (exists) {
        throw new AppError("Document already exists");
      }
    }

    if (user.registry) {
      const exists = await this.userRepository.findUserByField(
        "registry",
        user.registry
      );
      if (exists) {
        throw new AppError("Matricula already exists");
      }
    }

    if (user.password) {
      user.password = await this.hashProvider.generateHash(
        user.password as string
      );
    }

    const createdUser = await this.userRepository.create(user);

    return { ...createdUser };
  }
}
