import { Router } from "express";
import {
  getAllBooksRoute,
  getBookByIdRoute,
  saveBookRoute,
  updateBookRoute,
  deleteBookByIdRoute,
  notFoundRoute,
} from "../route/index.js";

const controller = Router();

// POST
controller.post("/books", saveBookRoute);

// GET
controller.get("/books", getAllBooksRoute);
controller.get("/books/:bookId", getBookByIdRoute);

// PUT
controller.put("/books/:bookId", updateBookRoute);

// DELETE
controller.delete("/books/:bookId", deleteBookByIdRoute);

// Error route
controller.get("*", notFoundRoute);

export { controller };
export default controller;
