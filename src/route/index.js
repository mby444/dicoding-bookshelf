import { getAllBooks, getBookById, saveBook, updateBook, deleteBookById } from "../handler/index.js";

export const getAllBooksRoute = async (req, res) => {
    try {
        const bookData = await getAllBooks();
        res.status(200).json({
            status: "success",
            data: {
                books: bookData.allBooks,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: "fail",
            message: err.message,
        });
    }
};

export const getBookByIdRoute = async (req, res) => {
    const { bookId } = req.params;
    try {
        const bookData = await getBookById(bookId);
        if (bookData.error) return res.status(404).json({
            status: "fail",
            message: bookData.message,
        });
        res.status(200).json({
            status: "success",
            data: {
                book: bookData.book,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: "fail",
            message: err.message,
        });
    }
};

export const saveBookRoute = async (req, res) => {
    try {
        const saved = await saveBook(req.body);
        if (saved.error) return res.status(400).json({
            status: "fail",
            message: saved.message,
        });
        res.status(201).json({
            status: "success",
            message: saved.message,
            data: {
                bookId: saved.bookId,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: "fail",
            message: err.message,
        });
    }
};

export const updateBookRoute = async (req, res) => {
    try {
        const { bookId } = req.params;
        const updated = await updateBook(bookId, req.body);
        res.status(201).json({
            message: updated.message,
        });
    } catch (err) {
        res.status(500).json({
            status: "fail",
            message: err.message,
        });
    }
};

export const deleteBookByIdRoute = async (req, res) => {
    try {
        const { bookId } = req.params;
        const deleted = await deleteBookById(bookId);
        if (deleted.error) return res.status(404).json({
            status: "fail",
            message: deleted.message,
        });
        res.status(201).json({
            message: deleted.message,
        });
    } catch (err) {
        res.status(500).json({
            status: "fail",
            message: err.message,
        });
    }
};

export const notFoundRoute = (req, res) => {
    res.sendStatus(404);
};