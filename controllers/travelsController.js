// dependencies
const express = require('express');
const travels = express.Router();
const travelAPIKEY = process.env.travelAPIKEY;

// models
const Travel = require('../models/travels.js');

// ROUTES -------------------------------------

// index
travels.get('/', async (req, res) => {
  try {
    const travels = await Travel.find();
    res.status(200).json(travels);
  } catch (error) {
    res.status(400).json({ error: err.message });
  }
});

// create
travels.post('/', async (req, res) => {
  try {
    const newTravel = await Travel.create(req.body);
    res.status(200).json(newTravel);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// delete
travels.delete('/:id', async (req, res) => {
  try {
    const deleteTravel = await Travel.findByIdAndRemove(req.params.id);
    res.status(200).json(deleteTravel);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// edit
travels.put('/:id', async (req, res) => {
  try {
    const updateTravel = await Travel.findByIdAndUpdate(req.params.id, req.body);
    console.log(updateTravel);
    res.status(200).json(updateTravel);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



module.exports = travels;
