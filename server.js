const express = require("express");
const { ideas } = require("./db/ideas");

const PORT = process.env.PORT || 3001;

const app = express();

//finds based on the title
function filterByQuery(query, ideasArray) {
  let filteredResults = ideasArray;
  if (query.id) {
    filteredResults = filteredResults.filter((idea) => idea.id === query.id);
  }
  return filteredResults;
}
// //finds based on the id number
// function findById(id, ideasArray) {
//   const result = ideasArray.filter((idea) => idea.id === id)[0];
//   return result;
// }

app.get("/api/ideas", (req, res) => {
  let results = ideas;
  console.log(req.query);
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

// app.get("/api/ideas/:id", (req, res) => {
//   const result = findById(req.params.id, ideas);
//   res.json(result);
// });

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
  console.log("http://localhost:3001/api/ideas");
});
