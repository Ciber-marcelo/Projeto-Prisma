import { Router } from "express";
import { userRoutes } from "./user.routes";

//(aula 02, 09:00)
const routes = Router();

routes.use("/users", userRoutes);

export { routes };