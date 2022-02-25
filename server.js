const express = require("express");
const { ideas } = require("./db/ideas");

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api/ideas", (req, res) => {
  console.log(req.query);
  res.json(ideas);
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
  console.log("http://localhost:3001/api/ideas");
});
