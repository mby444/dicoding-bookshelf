import fs from "fs/promises";
import path from "path";

export const booksPath = path.resolve("./storage/books.json");
export const detailsPath = path.resolve("./storage/details.json");

export const readFromJSON = async (path) => {
  const json = await fs.readFile(path, { encoding: "utf-8" });
  const data = !json.trim() ? [] : JSON.parse(json);
  return data;
};

export const readFromJSONById = async (path, id) => {
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
