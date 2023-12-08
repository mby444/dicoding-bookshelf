import { getAllBooks, getBookById, saveBook } from "../utility/bookshelf-manager.js";

export const indexRoute = (req, res) => {
    res.sendStatus(200);
};

export const getAllBooksRoute = async (req, res) => {
    try {
        const allBooks = await getAllBooks();
        res.status(200).json(allBooks);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export const getBookByIdRoute = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await getBookById(id)
        res.status(200).json(book);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export const saveBookRoute = async (req, res) => {
    try {
        await saveBook(req.body);
        res.status(201).json({
            message: "A book added successfully"
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
};
// export const saveBook = (req, res) => {

// };

export const notFoundRoute = (req, res) => {
    res.sendStatus(404);
};