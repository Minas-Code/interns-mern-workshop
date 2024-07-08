import { Router, Request, Response } from "express";

// New Router instance
const router = Router();

// Home routes
router.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Todo Backend!");
});

export default router;
