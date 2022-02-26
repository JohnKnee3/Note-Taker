const fs = require("fs");
const path = require("path");
const express = require("express");
const { notes } = require("./db/notes");

const PORT = process.env.PORT || 3001;

const app = express();
//allows us to use the entire public folder
app.use(express.static("public"));
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

//finds id using query
function filterByQuery(query, notesArray) {
  let filteredResults = notesArray;
  if (query.id) {
    filteredResults = filteredResults.filter((note) => note.id === query.id);
  }
  return filteredResults;
}

//Creates a new note to add to the notes object
function createNewNote(body, notesArray) {
  const note = body;
  notesArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, "./db/notes.json"),
    JSON.stringify({ notes: notesArray }, null, 2)
  );
  return note;
}

//makes sure all of the Title and Text fields have information.
function validateNote(note) {
  if (!note.title || typeof note.title !== "string") {
    return false;
  }
  if (!note.text || typeof note.text !== "string") {
    return false;
  }
  return true;
}

//delete note function
function deleteNote(id, notesArray) {
  console.log(id);
  // const cloneArray = notesArray.slice();
  // console.log(cloneArray);
  // cloneArray.splice(id);
  // cloneArray.join();

  // fs.writeFileSync(
  //   path.join(__dirname, "./db/notes.json"),
  //   JSON.stringify({ result }, null, 2)
  // );

  // return cloneArray;

  const result = notesArray.filter((note) => note.id === id)[0];
  return result;
}

//the GET that goes into the notes object and sends it to our filterByQuery function
app.get("/api/notes", (req, res) => {
  let results = notes;
  console.log(req.query);
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

//the POST that talks to createNewNote to add the the notes object
app.post("/api/notes", (req, res) => {
  // set id based on what the next index of the array will be
  req.body.id = notes.length.toString();

  // if any data in req.body is incorrect, send 400 error back
  if (!validateNote(req.body)) {
    res.status(400).send("The note is not properly formatted.");
  } else {
    // add note to json file and notes array in this function
    const note = createNewNote(req.body, notes);

    res.json(note);
  }
});

//starts on the index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

//displays the notes.html
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.delete("/api/notes/:id", (req, res) => {
  const note = deleteNote(req.params.id, notes);

  res.json(note);
});

// app.delete("/collections/:collectionName/:id", function (req, res, next) {
//   req.collection.remove(
//     {
//       _id: req.collection.id(req.params.id),
//     },
//     function (e, result) {
//       if (e) return next(e);
//       res.send(result === 1 ? { msg: "success" } : { msg: "error" });
//     }
//   );
// });

// app.del("/collections/:collectionName/:id", function (req, res, next) {
//   req.collection.remove(
//     {
//       _id: req.collection.id(req.params.id),
//     },
//     function (e, result) {
//       if (e) return next(e);
//       res.send(result === 1 ? { msg: "success" } : { msg: "error" });
//     }
//   );
// });

//Opens the server
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
  console.log("http://localhost:3001");
});

//the get code for using parameters instead of query

// //finds id based on parameters
// function findById(id, notesArray) {
//   const result = notesArray.filter((note) => note.id === id)[0];
//   return result;
// }

// app.get("/api/notes/:id", (req, res) => {
//   const result = findById(req.params.id, notes);
//   res.json(result);
// });
