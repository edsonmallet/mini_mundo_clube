import AppError from "@/shared/errors/app-error";
import { IUser } from "../../infra/http/database/entities/user";
import { IUserRepository } from "../../repositories/iuser-repository";
import { format, parseISO } from "date-fns";

interface IRequest {
  document: string;
  birthDate: string;
}

type Response = IUser;

export default class ShowUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  public async execute({ document, birthDate }: IRequest): Promise<Response> {
    if (!document || !birthDate) {
      throw new AppError(
        "Não é possível buscar seu usários sem documento e data de nascimento"
      );
    }

    const formatedDate = format(parseISO(birthDate), "yyyy-MM-dd");

    const user = await this.userRepository.findUser(document, formatedDate);

    return user;
  }
}
