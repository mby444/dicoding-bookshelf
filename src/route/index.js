import {
  getAllBooks,
  getBookById,
  saveBook,
  updateBook,
  deleteBookById,
} from "../handler/index.js";
import { HapiResponser } from "../tool/responser.js";

export const getAllBooksRoute = async (req, h) => {
  const { query } = req.query;
  try {
    const {
      error,
      message,
      statusCode,
      data: allBooks,
    } = await getAllBooks({ query });
    const hapier = new HapiResponser(h, statusCode, message);
    if (error) return hapier.response();
    return hapier.response({ books: allBooks });
  } catch (err) {
    return new HapiResponser(h, 500, err.message).response();
  }
};

export const getBookByIdRoute = async (req, h) => {
  const { bookId } = req.params;
  try {
    const {
      error,
      statusCode,
      message,
      data: book,
    } = await getBookById(bookId);
    const hapier = new HapiResponser(h, statusCode, message);
    if (error) return hapier.response();
    return hapier.response({ book });
  } catch (err) {
    return new HapiResponser(h, 500, err.message).response();
  }
};

export const saveBookRoute = async (req, h) => {
  try {
    const {
      error,
      statusCode,
      message,
      data: bookId,
    } = await saveBook(req.payload);
    const hapier = new HapiResponser(h, statusCode, message);
    if (error) return hapier.response();
    return hapier.response({ bookId });
  } catch (err) {
    console.log(err)
    return new HapiResponser(h, 500, err.message).response();
  }
};

export const updateBookRoute = async (req, h) => {
  try {
    const { bookId } = req.params;
    const { error, statusCode, message } = await updateBook(bookId, req.payload);
    const hapier = new HapiResponser(h, statusCode, message);
    return hapier.response();
  } catch (err) {
    return new HapiResponser(h, 500, err.message).response();
  }
};

export const deleteBookByIdRoute = async (req, h) => {
  try {
    const { bookId } = req.params;
    const { error, statusCode, message } = await deleteBookById(bookId);
    const hapier = new HapiResponser(h, statusCode, message);
    return hapier.response();
  } catch (err) {
    return new HapiResponser(h, 500, err.message).response();
  }
};

export const notFoundRoute = (req, h) => {
  res.sendStatus(404);
};
