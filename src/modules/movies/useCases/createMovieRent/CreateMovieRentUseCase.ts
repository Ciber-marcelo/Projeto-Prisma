import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { CreateMovieRentDTO } from "../../dtos/CreateMovieRentDTO";

export class CreateMovieRentUseCase {
    //": Promise<void>" esta aqui para retornar vazio já q uma relação n precisa retornar nada (por isso n tem um "return" la no final deste codigo)
    async execute ({ movieId, userId } : CreateMovieRentDTO) : Promise<void>{
        //verificando se o filme existe
        const movieExists = await prisma.movie.findUnique({
            where: {
                id: movieId
            }
        });

        if (!movieExists) {
            throw new AppError("Filme não existe!")
        }

        //verificando se o filme já foi alugado por algum usuario
        const movieAlreadyRented = await prisma.movieRent.findFirst({
            where: {
                movieId,
            }
        });

        if (movieAlreadyRented) {
            throw new AppError("O filme já foi alugado!");
        }

        //verificando se o usuario existe
        const userExists = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!userExists) {
            throw new AppError("Usuário não existe!")
        }

        //criando uma locação
        await prisma.movieRent.create({
            data: {
                movieId,
                userId
            },
        });
    }
}