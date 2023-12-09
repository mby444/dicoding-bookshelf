import fs from "fs/promises";
import path from "path";
import uniqid from "uniqid";

const booksPath = path.resolve("./storage/books.json");
const detailsPath = path.resolve("./storage/details.json");

const readFromJSON = async (path) => {
    const json = await fs.readFile(path, { encoding: "utf-8" });
    const data = !json.trim() ? [] : JSON.parse(json);
    return data;
};

const writeToJSON = async (path, data) => {
    const json = JSON.stringify(data);
    await fs.writeFile(path, json);
};

export const getAllBooks = async () => {
    const allBooks = await readFromJSON(booksPath);
    return {
        error: false,
        allBooks,
    }
};

export const getBookById = async (id) => {
    const allDetails = await readFromJSON(detailsPath);
    const book = allDetails.find((b) => b.id === id);
    if (!book) return {
        error: true,
        message: "Buku tidak ditemukan",
        book,
    };
    return {
        error: false,
        message: "",
        book,
    };
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
    if (!name?.trim()?.length) return { error: true, message: "Gagal menambahkan buku. Mohon isi nama buku" };
    if (readPage > pageCount) return { error: true, message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount" };
    const [oldBooks, oldDetails] = [await readFromJSON(booksPath), await readFromJSON(detailsPath)];
    const id = uniqid();
    const finished = readPage === pageCount;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const newBookData = { id, name, publisher };
    const newDetailData = {
        ...newBookData,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt,
    };
    await writeToJSON(booksPath, [...oldBooks, newBookData]);
    await writeToJSON(detailsPath, [...oldDetails, newDetailData]);
    return {
        error: false,
        message: "Buku berhasil ditambahkan",
        bookId: id,
    };
};

const updateBookObj = (book, updatedObj) => {
    const modifiableProps = ["name", "year", "author", "summary", "publisher", "pageCount", "readPage", "reading"];
    const updatedAt = new Date().toISOString();
    const { pageCount = book.pageCount, readPage = book.readPage } = updatedObj;
    const finished = readPage === pageCount;
    const outputObj = { ...book, finished, updatedAt };
    modifiableProps.forEach((prop) => {
        if (!(prop in updatedObj)) return;
        if (typeof updatedObj[prop] !== typeof book[prop]) throw new Error("Wrong data type");
        outputObj[prop] = updatedObj[prop];
    });
    const legals = [
        updatedObj?.name?.trim()?.length > 0,
        readPage >= 0 && readPage <= pageCount,
    ];
    const isLegal = legals.every((v) => v === true);
    if (!isLegal) throw new Error("Failed to update a book");
    return outputObj;
};

export const updateBook = async (id, updatedObj) => {
    const allBooks = await readFromJSON(booksPath);
    const book = allBooks.find((b) => b.id === id);
    if (!book) return {
        message: "No book updated",
    };
    const updatedBook = updateBookObj(book, updatedObj);
    const allBooksModified = allBooks.map((b) => b.id === id ? updatedBook : b);
    await writeToJSON(booksPath, allBooksModified);
    return {
        message: "A book updated successfully",
    };
};

export const deleteBookById = async (id) => {
    const [allBooks, allDetails] = [await readFromJSON(booksPath), await readFromJSON(detailsPath)];
    const book = !!allBooks.find((b) => b.id === id);
    if (!book) return { error: true, message: "Buku gagal dihapus. Id tidak ditemukan" };
    const filteredBooks = allBooks.filter((b) => b.id !== id);
    const filteredDetails = allDetails.filter((d) => d.id !== id);
    await writeToJSON(booksPath, filteredBooks);
    await writeToJSON(detailsPath, filteredDetails);
    return {
        error: false,
        message: "Buku berhasil dihapus",
    };
};