import {
  getAllBooksRoute,
  getBookByIdRoute,
  saveBookRoute,
  updateBookRoute,
  deleteBookByIdRoute,
  notFoundRoute,
} from "../route/index.js";

export const controllers = [
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksRoute,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBookByIdRoute,
  },
  {
    method: 'POST',
    path: '/books',
    handler: saveBookRoute,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: updateBookRoute,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookByIdRoute,
  },
];

export default controllers;