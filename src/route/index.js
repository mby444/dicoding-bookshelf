import {
  getAllBooks,
  getBookById,
  saveBook,
  updateBook,
  deleteBookById,
} from "../handler/index.js";
import { HapiResponser } from "../tool/responser.js";

export const getAllBooksRoute = (req, h) => {
  const { query } = req;
  try {
    const {
      error,
      message,
      statusCode,
      data: allBooks,
    } = getAllBooks({ query });
    const hapier = new HapiResponser(h, statusCode, message);
    const hapierParam = error ? null : { books: allBooks };
    return hapier.response(hapierParam);
  } catch (err) {
    return new HapiResponser(h, 500, err.message).response();
  }
};

export const getBookByIdRoute = (req, h) => {
  const { bookId } = req.params;
  try {
    const { error, statusCode, message, data: book } = getBookById(bookId);
    const hapier = new HapiResponser(h, statusCode, message);
    const hapierParam = error ? null : { book };
    return hapier.response(hapierParam);
  } catch (err) {
    return new HapiResponser(h, 500, err.message).response();
  }
};

export const saveBookRoute = (req, h) => {
  try {
    const { error, statusCode, message, data: bookId } = saveBook(req.payload);
    const hapier = new HapiResponser(h, statusCode, message);
    const hapierParam = error ? null : { bookId };
    return hapier.response(hapierParam);
  } catch (err) {
    return new HapiResponser(h, 500, err.message).response();
  }
};

export const updateBookRoute = (req, h) => {
  try {
    const { bookId } = req.params;
    const { statusCode, message } = updateBook(bookId, req.payload);
    const hapier = new HapiResponser(h, statusCode, message);
    return hapier.response();
  } catch (err) {
    return new HapiResponser(h, 500, err.message).response();
  }
};

export const deleteBookByIdRoute = (req, h) => {
  try {
    const { bookId } = req.params;
    const { statusCode, message } = deleteBookById(bookId);
    const hapier = new HapiResponser(h, statusCode, message);
    return hapier.response();
  } catch (err) {
    return new HapiResponser(h, 500, err.message).response();
  }
};
