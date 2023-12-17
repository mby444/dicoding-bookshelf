import uniqid from "uniqid";
import { removeUnknownProps, filterByQuery } from "../tool/index.js";
import {
  books as allBooks,
  details as allDetails,
} from "../../storage/bookshelf.js";
import { Responser } from "../tool/responser.js";

export const getAllBooks = ({ query = {} }) => {
  const queriedBooks = filterByQuery(allBooks, allDetails, query);
  return new Responser(200, "", queriedBooks);
};

export const getBookById = (id) => {
  const book = allDetails.find((b) => b.id === id);
  if (!book) return new Responser(404, "Buku tidak ditemukan");
  return new Responser(200, "", book);
};

export const saveBook = ({
  name,
  year,
  author,
  summary,
  publisher,
  pageCount,
  readPage,
  reading,
}) => {
  const isValidName = typeof name === "string" ? !!name.trim() : false;
  const isValidPageCount = readPage > pageCount;
  if (!isValidName)
    return new Responser(400, "Gagal menambahkan buku. Mohon isi nama buku");
  if (isValidPageCount)
    return new Responser(
      400,
      "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    );
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
  allBooks.push(newBookData);
  allDetails.push(newDetailData);
  return new Responser(201, "Buku berhasil ditambahkan", id);
};

export const updateBook = (id, reqBody) => {
  const newReqBody = removeUnknownProps(reqBody);
  const [bookIndex, detailIndex] = [
    allBooks.findIndex((b) => b.id === id),
    allDetails.findIndex((d) => d.id === id),
  ];
  const [book, detail] = [allBooks[bookIndex], allDetails[detailIndex]];
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
      "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
    );
  const updatedBook = { id, name, publisher };
  const finished = readPage === pageCount;
  const updatedAt = new Date().toISOString();
  const updatedDetail = { ...detail, ...newReqBody, finished, updatedAt };
  allBooks[bookIndex] = updatedBook;
  allDetails[detailIndex] = updatedDetail;
  return new Responser(200, "Buku berhasil diperbarui");
};

export const deleteBookById = (id) => {
  const book = allBooks.find((b) => b.id === id);
  if (!book)
    return new Responser(404, "Buku gagal dihapus. Id tidak ditemukan");
  const filteredBooks = allBooks.filter((b) => b.id !== id);
  const filteredDetails = allDetails.filter((d) => d.id !== id);
  allBooks.length = 0;
  allDetails.length = 0;
  allBooks.push(...filteredBooks);
  allDetails.push(...filteredDetails);
  return new Responser(200, "Buku berhasil dihapus");
};
