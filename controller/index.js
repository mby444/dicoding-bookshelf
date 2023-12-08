import { Router } from "express";
import { indexRoute, getAllBooksRoute, saveBookRoute, notFoundRoute } from "../route/index.js";

const router = Router();

// GET
router.get("/", indexRoute);
router.get("/all", getAllBooksRoute);

// POST
router.post("/save", saveBookRoute);

// Error route
router.get("*", notFoundRoute);

export { router };
export default router;