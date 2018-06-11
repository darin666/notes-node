const fs = require('fs');

// fetching notes from the fs - refactoring the existing function
var fetchNotes = () => {
    try {
        var notesString = fs.readFileSync('notes-data.json');
        // returning object
        return JSON.parse(notesString);
    } catch (e) {
        return [];
    }
};

// saving notes to the fs
var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

//addNote, getAll, getNote, removeNote

var addNote = (title, body) => {
    var notes = fetchNotes();
    var note = {
        title,
        body
    };

    var duplicateNotes = notes.filter((note) => note.title === title);
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
    // fetch notes
    var notes = fetchNotes();
    // filter notes
    var filteredNotes = notes.filter((note) => note.title === title);
    // return result will be array - we want the first and only item
    return filteredNotes[0];
}

var removeNote = (title) => {
    // fetch notes
    var notes = fetchNotes();
    // filter notes, removing the one with title of argument
    var filteredNotes = notes.filter((note) => note.title !== title);
    // save new notes array
    saveNotes(filteredNotes);
    // return true if the arrays are not equal, return false if they are equal
    return notes.length !== filteredNotes.length;

}

var logNote = (note) => {
    console.log('--');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
}

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote
}