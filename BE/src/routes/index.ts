import { Router } from "express";
import homeRouter from "./home.routes";
import todoRouter from "./todo.routes";
import authRouter from "./auth.routes";
// Create a new Router instance
const router = Router();

// Mount the routers
router.use("/", homeRouter);
router.use("/todo", todoRouter);
router.use("/auth", authRouter);

export default router;
