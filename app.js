const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions = {
    describe : 'Title of a note',
    demand : true,
    alias : 't'
};

const bodyOptions = {
    describe : 'Body of a note',
    demand: true,
    alias : 'b'
};

const argv = yargs
    // commands configuration
    .command('add', 'Add a new note', {
        title : titleOptions,
        body : bodyOptions
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note', {
        title : titleOptions
    })
    .command('remove', 'Remove a note', {
        title : titleOptions
    })
    .help()
    .argv;
var command = argv._[0];

// ADD
if (command === 'add') {
    // storing the boolean from addNote() return call
    var note = notes.addNote(argv.title, argv.body);
    // printing the message - created ok or !ok
    if (note) {
        console.log('Note created');
        notes.logNote(note);
    } else {
        console.log('Note title taken');
    }

// LIST
} else if (command === 'list') {
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s).`);
    allNotes.forEach((note) => notes.logNote(note));

// READ
} else if (command === 'read') {
    var note = notes.getNote(argv.title);
    if (note) {
        console.log('Note found');
        notes.logNote(note);
    } else {
        console.log('Note not found');
    }

// REMOVE
} else if (command === 'remove') {
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? 'Note was removed' : 'Note not found';
    console.log(message);
} else {
    console.log('Command not recognized');
}