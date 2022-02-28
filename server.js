const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const express = require("express");
// const { notes } = require("./db/notes");

const PORT = process.env.PORT || 3001;

const app = express();
//allows us to use the entire public folder
app.use(express.static("public"));
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

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
  const cloneArray = notesArray.filter((note) => note.id !== id);

  fs.writeFileSync(
    path.join(__dirname, "./db/notes.json"),
    JSON.stringify({ notes: cloneArray }, null, 2)
  );

  return cloneArray;
}

//the GET that goes into the notes object and sends it to our filterByQuery function
app.get("/api/notes", (req, res) => {
  let results = JSON.parse(fs.readFileSync("./db/notes.json", "utf8"));

  res.json(results);
});

//the POST that talks to createNewNote to add the the notes object
app.post("/api/notes", (req, res) => {
  // set id based on what the next index of the array will be
  req.body.id = uuidv4();

  // if any data in req.body is incorrect, send 400 error back
  if (!validateNote(req.body)) {
    res.status(400).send("The note is not properly formatted.");
  } else {
    let results = JSON.parse(fs.readFileSync("./db/notes.json", "utf8"));
    // add note to json file and notes array in this function
    const note = createNewNote(req.body, results.notes);

    res.json(note);
  }
});

app.delete("/api/notes/:id", (req, res) => {
  let results = JSON.parse(fs.readFileSync("./db/notes.json", "utf8"));
  const note = deleteNote(req.params.id, results.notes);

  res.json(note);
});

//starts on the index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

//displays the notes.html
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

//Opens the server
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
  console.log("http://localhost:3001");
});
