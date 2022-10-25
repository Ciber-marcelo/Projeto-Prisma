
import { Movie } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { CreateMovieDTO } from "../../dtos/CreateMovieDTO";

export class CreateMovieUseCase {
    //": CreateMovieDTO" é a tipagem que criamos com typescript, e em ": Promise<Movie>" estou tipano de novo kk, depois pesquis apara entender melhor (aula 02, 06:00)
    async execute ({ title, duration, release_date} : CreateMovieDTO) : Promise<Movie>{
        //verificando se o filme já existe
        const movieAlreadyExists = await prisma.movie.findUnique({
            where: {
                title
            }
        });

        if (movieAlreadyExists) {
            //aqui estamos chamando o erro q criamos na pasta "errors"
            throw new AppError("Filme já existe!")
        }

        //criando um usuario(aula 02, 05:30)
        const movie = await prisma.movie.create({
            data: {
                title,
                duration,
                release_date
            }
        });

        return movie;
    }
}