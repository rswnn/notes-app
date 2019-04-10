const fs = require('fs');
var fetchNotes = () => {
  try {
    var noteString = fs.readFileSync('notes-data.json');
    return JSON.parse(noteString);
  } catch (e) {
    return [];
  }
};

var saveNotes = (notes) =>{
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}

var addNote = (title, body) => {
  var notes = fetchNotes();
  var note = {
    title,
    body
  };

  var duplicateNotes = notes.filter((note) => note.title === title);
  console.log(duplicateNotes);

  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }

};
var getAll = () => {
  return fetchNotes();
}

var getNote = (title) => {
  var notes = fetchNotes();
  console.log(notes);
  var filteredNotes = notes.filter((e) => e.title === title);
  console.log(filteredNotes);
  return filteredNotes[0];
}

var removeNote = (title) => {
  var notes = fetchNotes();
  var filteredNotes = notes.filter((e) => e.title !== title);
  saveNotes(filteredNotes);

  return notes.length !== filteredNotes.length;
}
var logNote = (note) => {
  debugger;
  console.log('----------');
  console.log(`Title : ${note.title}`);
  console.log(`Body : ${note.body}`);
}

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote
};
