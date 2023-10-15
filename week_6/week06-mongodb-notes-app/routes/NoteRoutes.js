const express = require("express");
const noteModel = require('../models/Notes.js');

const routes = express.Router();

// TODO - Create a new Note
// POST: http://localhost:8081/notes
routes.post('/notes', async (req, res) => {
    console.log(req.body)
    try{
        // Validate request
        if(!req.body.noteTitle || !req.body.noteDescription || !req.body.priority) {
            return res.status(400).send({
                message: "Note title, description, and priority are required"
            });
        }
        //TODO - Write your code here to save the note

        const newNotes = new noteModel({
            ...req.body
        })
        await newNotes.save()
        //BookModel.create({})
        res.status(200).send(newNotes)
    }catch(error){
        res.status(500).send(error)
    }
});

// TODO - Retrieve all Notes
// GET: http://localhost:8081/notes
routes.get('/notes', async (req, res) => {
    //TODO - Write your code here to returns all note
    try{
        const noteList = await noteModel.find({})
        res.status(200).send(noteList)
    }catch(error) {
        res.status(500).send(error)
    }
});

//TODO - Retrieve a single Note with noteId
// GET: http://localhost:8081/notes/:noteId
routes.get('/notes/:noteId', async (req, res) => {
    //TODO - Write your code here to return onlt one note using noteid
    try {
        const note = await noteModel.findById(req.params.noteId);

        if (!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }

        res.status(200).send(note);
    }catch(error) {
        if (error.name === "CastError") {
            return res.status(400).send({
                message: "Invalid note ID"
            });
        }
        res.status(500).send(error)
    }
});

//TODO - Update a Note with noteId
// PUT: http://localhost:8081/notes/:noteId
routes.put('/notes/:noteId', async (req, res) => {
    //TODO - Write your code here to update the note using noteid
    try {
        // Validate request
        if (!req.body.noteTitle || !req.body.noteDescription || !req.body.priority) {
            return res.status(400).send({
                message: "Note title, description, and priority are required"
            });
        }

        const updatedNote = await noteModel.findByIdAndUpdate(
            req.params.noteId,
            {
                noteTitle: req.body.noteTitle,
                noteDescription: req.body.noteDescription,
                priority: req.body.priority,
                dateUpdated: Date.now()
            },
            { new: true }
        );

        if (!updatedNote) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }

        res.status(200).send(updatedNote);
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).send({
                message: "Invalid note ID"
            });
        }
        res.status(500).send(error);
    }
});

//TODO - Delete a Note with noteId
// DELETE: http://localhost:8081/notes/:noteId
routes.delete('/notes/:noteId', async (req, res) => {
    //TODO - Write your code here to delete the note using noteid
    try {

        const deletedNote = await noteModel.findByIdAndRemove(req.params.noteId);

        if (!deletedNote) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }

        res.status(200).send({ message: "Note deleted successfully" });
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).send({
                message: "Invalid note ID"
            });
        }
        res.status(500).send(error);
    }
});

module.exports = routes;