const fs = require("fs");
const path = require("path");

//Filter ID
function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
  }
  //Create a new note
  function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
      path.join(__dirname, '../db/db.json'),
      JSON.stringify({ notesArray }, null, 2)
    );
    return note;
  }
  //Validation
  function validateNotes(note) {
    if (!note.title || typeof note.title !== 'string') {
      return false;
    }
    if (!note.text || typeof note.text !== 'string') {
      return false;
    }
    return true;
}
  
  module.exports = {
    findById,
    createNewNote,
    validateNotes
  };