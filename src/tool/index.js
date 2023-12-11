import fsSync, { promises as fs } from "fs";
import path from "path";

export const booksPath = path.resolve("./storage/books.json");
export const detailsPath = path.resolve("./storage/details.json");

const checkValidJSON = (json) => {
  try {
    JSON.parse(json);
    return true;
  } catch (err) {
    return false;
  }
};

const parseJSON = (json) => {
  const isValidJSON = checkValidJSON(json);
  if (!isValidJSON) return null;
  return JSON.parse(json);
};

const resetJSONWhenInvalid = async (json) => {
  const isValidJSON = checkValidJSON(json);
  if (isValidJSON) return;
  await fs.writeFile(booksPath, "[]");
  await fs.writeFile(detailsPath, "[]");
};

export const readFromJSON = async (path) => {
  const isFileExists = fsSync.existsSync(path);
  if (!isFileExists) {
    await fs.writeFile(path, "[]");
    return [];
  }
  const json = await fs.readFile(path, { encoding: "utf-8" });
  const data = parseJSON(json) ?? [];
  await resetJSONWhenInvalid(json);
  return data;
};

export const readFromJSONById = async (path, id) => {
  const isFileExists = fsSync.existsSync(path);
  if (!isFileExists) {
    await fs.writeFile(path, "[]");
    return null;
  }
  const allData = await readFromJSON(path);
  const data = allData.find((d) => d.id === id);
  return data;
};

export const writeToJSON = async (path, data) => {
  const json = JSON.stringify(data);
  await fs.writeFile(path, json);
};

export const updateJSONById = async (path, id, updatedProps) => {
  const allData = await readFromJSON(path);
  const dataIndex = allData.findIndex((d) => d.id === id);
  if (dataIndex === -1) return;
  const data = allData[dataIndex];
  const newData = { ...data, ...updatedProps };
  allData[dataIndex] = newData;
  await writeToJSON(path, allData);
};

export const removeUnknownProps = (reqBody = {}) => {
  const availableProps = [
    "id",
    "name",
    "publisher",
    "year",
    "author",
    "summary",
    "pageCount",
    "readPage",
    "finished",
    "reading",
  ];
  const newReqBody = {};
  Object.keys(reqBody).forEach((key) => {
    const isKeyExists = availableProps.find((prop) => prop === key);
    if (!isKeyExists) return;
    newReqBody[key] = reqBody[key];
  });
  return newReqBody;
};

export const filterByQuery = (
  allBooks,
  allDetails,
  { name, reading, finished },
) => {
  const queriedBooks = allBooks.filter((book) => {
    const detail = allDetails.find((d) => d.id === book.id);
    const readingNum = String(Number(detail.reading));
    const finishedNum = String(Number(detail.finished));
    const isMatchName = name
      ? book.name.toLowerCase().trim().includes(name?.toLowerCase())
      : true;
    const isMatchReading = ["0", "1"].includes(reading)
      ? reading === readingNum
      : true;
    const isMatchFinished = ["0", "1"].includes(finished)
      ? finished === finishedNum
      : true;
    return isMatchName && isMatchReading && isMatchFinished;
  });
  return queriedBooks;
};
