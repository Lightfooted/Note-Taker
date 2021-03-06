const router = require('express').Router();
const {
  findById,
  createNewNote,
  validateNotes,
  deleteNote
} = require('../../lib/note');
const { notes } = require('../../db/db');
const { nanoid } = require('nanoid');

router.get('/notes', (req, res) => {
    res.json(notes);
});

router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
      res.json(result);
    } else {
      res.send(404);
    }
});

router.post('/notes', (req, res) => {
    req.body.id = nanoid();

    if(!validateNotes(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});


router.delete('/notes/:id', (req, res) => {
  deleteNote(notes, req.params.id);
  res.json(notes);
});

module.exports = router;