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
    const nameLower = name ? name.trim().toLowerCase() : undefined;
    const isMatchName = name
      ? book.name.toLowerCase().trim().includes(nameLower)
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
