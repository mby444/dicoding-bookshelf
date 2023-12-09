import { Router } from "express";
import { getAllBooksRoute, getBookByIdRoute, saveBookRoute, updateBookRoute, deleteBookByIdRoute, notFoundRoute } from "../route/index.js";

const router = Router();

// POST
router.post("/books", saveBookRoute);

// GET
router.get("/books", getAllBooksRoute);
router.get("/books/:bookId", getBookByIdRoute);

// PUT
router.put("/books/:bookId", updateBookRoute);

// DELETE
router.delete("/books/:bookId", deleteBookByIdRoute);

// Error route
router.get("*", notFoundRoute);

export { router };
export default router;