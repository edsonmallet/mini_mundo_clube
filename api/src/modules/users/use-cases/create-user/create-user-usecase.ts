import AppError from "@/shared/errors/app-error";
import { ICreateUserDTO } from "../../dtos/icreate-user-dto";
import { IUser } from "../../infra/http/database/entities/user";
import IHashProvider from "../../providers/hash-provider/models/ihashprovider";
import { IUserRepository } from "../../repositories/iuser-repository";
import crypto from "crypto";
import { format, parseISO } from "date-fns";

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
    if (!user || !user.document || !user.birthDate) {
      throw new AppError(
        "Não é possível criar seu usários sem documento e data de nascimento"
      );
    }

    const existsUser = await this.userRepository.findUser(
      user.document,
      format(parseISO(user.birthDate as string), "yyyy-MM-dd")
    );

    if (!existsUser) {
      throw new AppError("Usuário não encontrado");
    }

    if (existsUser.parentUuid && !existsUser?.parent?.isActivated) {
      throw new AppError("Seu responsável ainda não ativou seu cadastro");
    }

    if (!user.password) {
      throw new AppError("Não é possível criar seu usários sem senha");
    }

    user.password = await this.hashProvider.generateHash(
      user.password as string
    );

    user.registerDate = new Date();
    user.birthDate = new Date(user.birthDate);
    user.companyUuid = existsUser.companyUuid;
    user.walletUuid = existsUser.walletUuid;
    user.tokenDiscount = crypto.randomUUID();
    user.isActivated = true;
    user.isAdminCompany = false;

    const createdUser = await this.userRepository.update(existsUser.uuid, user);

    return createdUser;
  }
}
