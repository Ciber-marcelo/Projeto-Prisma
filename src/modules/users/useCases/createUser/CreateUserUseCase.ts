
import { User } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { CreateUserDTO } from "../../dtos/CreateUserDTO";

export class CreateUserUseCase {
    //": CreateUserDTO" é a tipagem que criamos com typescript, e em ": Promise<User>" estou tipano de novo kk, depois pesquis apara entender melhor (aula 02, 06:00)
    async execute ({ name, email} : CreateUserDTO) : Promise<User>{
        //verificando se o usuario já existe(aula 2, 04:00)
        const userAlreadyExists = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (userAlreadyExists) {
            //aqui estamos chamando o erro q criamos na pasta "errors"
            throw new AppError("Usuário já existe!", 404)
        }

        //criando um usuario(aula 02, 05:30)
        const user = await prisma.user.create({
            data: {
                name,
                email
            }
        });

        return user;
    }
}