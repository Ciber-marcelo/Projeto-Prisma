import { Router } from "express";
import { movieRoutes } from "./movie.routes";
import { userRoutes } from "./user.routes";

//(aula 02, 09:00)
const routes = Router();

routes.use("/users", userRoutes);
routes.use("/movies", movieRoutes);

export { routes };