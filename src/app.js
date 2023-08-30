const express = require("express");
const app = express();

app.use(express.json());

const notes = require("./data/notes-data");

app.get("/notes", (req, res) => {
  res.json({ data: notes });
});

// TODO: Add ability to create a new note

app.post("/notes", (req, res, next) => {
  let lastNoteId = notes.reduce((maxId, note) => Math.max(maxId, note.id), 0);
  const { data: {text} = {} } = req.body;
  if (req.body.data && req.body.data.text) {
    const newNote = {
      id: ++lastNoteId,
      text,
    };
    notes.push(newNote);
    res.status(201).json({ data: newNote });
  } else {
    res.sendStatus(400);
  }
  });

app.get("/notes/:noteId", (req, res, next) => {
   const { noteId } = req.params;
  
  const foundNote = notes.find((note) => note.id === Number(noteId));
  foundNote &&
  res.json({ data: foundNote });
  res.status(400).json(`Note id not found: ${noteId}`);
});

// TODO: Add not-found handler
app.use((req, res, next) => {
  next(`Not found: ${req.originalUrl}`);
});
// TODO: Add error handler
app.use((err, req, res, next) => {
  res.status(400).send(err);
})

module.exports = app;
