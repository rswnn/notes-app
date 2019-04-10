const fs = require('fs');
const notes = require('./notes.js')
const _ = require('lodash');
const yargs = require('yargs');

const titleOptions = {
  describe: 'Title of note',
  demand: true,
  alias: 't'
};

const bodyOptions = {
  describe: 'Body of note',
  demand: true,
  alias: 'b'
}

const argv = yargs
.command('add',' Add a new note', {
  title: titleOptions,
  body: bodyOptions
})
.command('list', 'List all notes')
.command('read', 'read a note', {
  title: titleOptions
})
.command('remove', 'Remove a notes', {
  title: titleOptions
})
.help()
.argv;
var command = argv._[0];

if (command === 'add') {
  var note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log('Note created');
    console.log('------------');
    console.log(`Title : ${note.title}`);
    console.log(`Body : ${note.body}`);
  } else {
    console.log('Note has been created');
  }
} else if (command === 'list') {
  var allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s)`);
  allNotes.forEach((el) => notes.logNote(el));
} else if (command === 'read') {
  var note = notes.getNote(argv.title);

  if (note) {
    console.log('Note found');
    notes.logNote(note);
  } else {
    console.log('Note not found');
  }
} else if (command === 'remove') {
  var noteRemoved = notes.removeNote(argv.title);
  var message = noteRemoved ? 'Note was removed' : 'note not found';
  console.log(message);
} else {
  console.log('command not recognized');
}
