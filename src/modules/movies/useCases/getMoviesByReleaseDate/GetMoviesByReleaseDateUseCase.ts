import { Movie } from "@prisma/client";
import { prisma } from "../../../../prisma/client";

export class GetMoviesByReleaseDateUseCase {
    async execute(): Promise<Movie[]> {
        //"findMany()" é pra pegar varios filmes
        const movies = await prisma.movie.findMany({
            //aqui eu estou ordenando os filmes, "desc" serve para ordenalos de forma decrescente
            orderBy: {
                release_date: "desc"
            },
            //serve para incluir coisas, neste caso as relações
            include: {
                movie_rent: {
                    select: {
                        user: {
                            select: {
                                name: true,
                                email: true,
                            }
                        },
                    },
                },
            },
        });

        return movies;
    }
}