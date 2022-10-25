//"express-async-errors" é uma biblioteca para evitar erros no banco de dados
import "express-async-errors";
import express, { NextFunction, Request, Response } from 'express';
import { routes } from './routes';
import { AppError } from "./errors/AppError";

const app = express();

app.use(express.json());

app.use(routes);

//embaixo estou fazendo um middleware para tratar o erro(pesquise depois para entender melhor)
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: "error",
            message: err.message
        })
    }

    return response.status(500).json({
        status: "error",
        message: `Erro interno do servidor - ${err.message}`
    })
})

//caminho do servidor do banco de dados
app.listen(3333, () => console.log("O server está rodando na porta 3333"))