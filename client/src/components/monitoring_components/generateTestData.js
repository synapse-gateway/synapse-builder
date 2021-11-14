const fs = require("fs");

const fileName = "data.js";

const ObjectId = (rnd = (r16) => Math.floor(r16).toString(16)) =>
  rnd(Date.now() / 1000) +
  " ".repeat(16).replace(/./g, () => rnd(Math.random() * 16));

const fieldOptions = [["getBooks", "getAuthors"], ["getBooks"], ["getAuthors"]];

fs.writeFile(fileName, "[\n", errorFunc);

for (let idx = 0; idx < 10000; idx++) {
  let content = `{ "_id": "${ObjectId()}", "unixTime": ${random(
    1634085529,
    1636742329
  )}, "operation": "${["query", "mutation"][Math.floor(Math.random() * 2)]}",
  "latency": ${String(random(100, 500).toFixed(3))}, "rootField": ${
    fieldOptions[Math.floor(Math.random() * 3)]
  } },\n`;

  fs.appendFile(fileName, content, errorFunc);
}

fs.appendFile(fileName, "\n]", errorFunc);

function errorFunc(err) {
  if (err) return console.error(err);
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
