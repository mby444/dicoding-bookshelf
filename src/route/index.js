import {
  getAllBooks,
  getBookById,
  saveBook,
  updateBook,
  deleteBookById,
} from "../handler/index.js";

export const getAllBooksRoute = async (req, res) => {
  const query = req.query;
  try {
    const { error, message, statusCode, data: allBooks } = await getAllBooks({ query });
    if (error)
      return res.status(statusCode).json({
        status: "fail",
        message,
      });
    res.status(statusCode).json({
      status: "success",
      data: {
        books: allBooks,
      },
    });
  } catch (err) {
    console.log(24, err);
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const getBookByIdRoute = async (req, res) => {
  const { bookId } = req.params;
  try {
    const {
      error,
      statusCode,
      message,
      data: book,
    } = await getBookById(bookId);
    if (error)
      return res.status(statusCode).json({
        status: "fail",
        message,
      });
    res.status(statusCode).json({
      status: "success",
      data: {
        book,
      },
    });
  } catch (err) {
    console.log(53, err)
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const saveBookRoute = async (req, res) => {
  try {
    const {
      error,
      statusCode,
      message,
      data: bookId,
    } = await saveBook(req.body);
    if (error)
      return res.status(statusCode).json({
        status: "fail",
        message,
      });
    res.status(statusCode).json({
      status: "success",
      message: message,
      data: {
        bookId,
      },
    });
  } catch (err) {
    console.log(82, err)
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const updateBookRoute = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { error, statusCode, message } = await updateBook(bookId, req.body);
    if (error)
      return res.status(statusCode).json({
        status: "fail",
        message,
      });
    res.status(statusCode).json({
        status: "success",
        message,
    });
  } catch (err) {
    console.log(104, err)
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const deleteBookByIdRoute = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { error, statusCode, message } = await deleteBookById(bookId);
    if (error)
      return res.status(statusCode).json({
        status: "fail",
        message,
      });
    res.status(statusCode).json({
        status: "success",
        message,
    });
  } catch (err) {
    console.log(126, err)
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const notFoundRoute = (req, res) => {
  res.sendStatus(404);
};
