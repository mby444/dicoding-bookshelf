import uniqid from "uniqid";
import {
  booksPath,
  detailsPath,
  readFromJSON,
  readFromJSONById,
  writeToJSON,
  updateJSONById,
  removeUnknownProps,
  filterByQuery,
} from "../tool/index.js";
import { Responser } from "../tool/responser.js";

export const getAllBooks = async ({ query = {} }) => {
  const allBooks = await readFromJSON(booksPath);
  const allDetails = await readFromJSON(detailsPath);
  const queriedBooks = filterByQuery(allBooks, allDetails, query);
  return new Responser(200, "", queriedBooks);
};

export const getBookById = async (id) => {
  const allDetails = await readFromJSON(detailsPath);
  const book = allDetails.find((b) => b.id === id);
  if (!book) return new Responser(404, "Buku tidak ditemukan");
  return new Responser(200, "", book);
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
  if (!name?.trim()?.length)
    return new Responser(400, "Gagal menambahkan buku. Mohon isi nama buku");
  if (readPage > pageCount)
    return new Responser(
      400,
      "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
    );
  const [oldBooks, oldDetails] = [
    await readFromJSON(booksPath),
    await readFromJSON(detailsPath),
  ];
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
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };
  await writeToJSON(booksPath, [...oldBooks, newBookData]);
  await writeToJSON(detailsPath, [...oldDetails, newDetailData]);
  return new Responser(201, "Buku berhasil ditambahkan", id);
};

export const updateBook = async (id, reqBody) => {
  const newReqBody = removeUnknownProps(reqBody);
  const [book, detail] = [
    await readFromJSONById(booksPath, id),
    await readFromJSONById(detailsPath, id),
  ];
  if (!book || !detail)
    return new Responser(404, "Gagal memperbarui buku. Id tidak ditemukan");
  const {
    name = "",
    publisher = detail.publisher,
    readPage = detail.readPage,
    pageCount = detail.pageCount,
  } = reqBody;
  if (!name.trim())
    return new Responser(400, "Gagal memperbarui buku. Mohon isi nama buku");
  if (readPage > pageCount)
    return new Responser(
      400,
      "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
    );
  const updatedBook = { id, name, publisher };
  const updatedAt = new Date().toISOString();
  const updatedDetail = { ...updatedBook, ...newReqBody, updatedAt };
  await updateJSONById(booksPath, id, updatedBook);
  await updateJSONById(detailsPath, id, updatedDetail);
  return new Responser(200, "Buku berhasil diperbarui");
};

export const deleteBookById = async (id) => {
  const [allBooks, allDetails] = [
    await readFromJSON(booksPath),
    await readFromJSON(detailsPath),
  ];
  const book = !!allBooks.find((b) => b.id === id);
  if (!book)
    return new Responser(404, "Buku gagal dihapus. Id tidak ditemukan");
  const filteredBooks = allBooks.filter((b) => b.id !== id);
  const filteredDetails = allDetails.filter((d) => d.id !== id);
  await writeToJSON(booksPath, filteredBooks);
  await writeToJSON(detailsPath, filteredDetails);
  return new Responser(200, "Buku berhasil dihapus");
};
