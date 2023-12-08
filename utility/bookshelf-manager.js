import fs from "fs/promises";
import path from "path";
import uniqid from "uniqid";

const bookshelfPath = path.resolve("./storage/bookshelf.json");

export const getAllBooks = async () => {
    const booksJSON = await fs.readFile(bookshelfPath, { encoding: "utf-8" });
    const books = !booksJSON.trim() ? [] : JSON.parse(booksJSON);
    return books;
};

export const getBookById = async (id) => {
    const allBooks = await getAllBooks();
    const filtered = allBooks.filter((b) => b.id === id);
    const book = filtered.length ? filtered[0] : null;
    return book;
};

export const saveBook = async ({
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
}) => {
    const isFailed = !name || readPage > pageCount;
    if (isFailed) throw new Error("Failed to add a new book");
    const oldBooks = await getAllBooks();
    const id = uniqid();
    const finished = readPage === pageCount;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const newBookData = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt
    };
    const newBooks = [...oldBooks, newBookData];
    const newBooksJSON = JSON.stringify(newBooks);
    await fs.writeFile(bookshelfPath, newBooksJSON);
};