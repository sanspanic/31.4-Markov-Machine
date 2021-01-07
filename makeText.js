/** Command-line tool to generate Markov text. */
const fs = require("fs");
const process = require("process");
const axios = require("axios");
const mm = require("./markov");
const source = process.argv[2];
let result;
const path = process.argv[3];

const readFromAxios = async (url) => {
  try {
    const res = await axios.get(url);
    generateText(res.data);
  } catch (err) {
    console.log("Oops, something went wrong:", err);
  }
};

const readFromFile = (file) => {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.log("Could not read file", err);
    } else {
      generateText(data);
    }
  });
};

if (source === "url") {
  result = readFromAxios(path);
} else {
  result = readFromFile(path);
}

function generateText(res) {
  let markov = new mm.MarkovMachine(res);
}
