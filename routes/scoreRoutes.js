// routes/gameRoutes.js
const express = require('express');
const router = express.Router();
const Game = require('../models/Score');

// GET all game data
router.get('/', async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST a new game data point or update score for an existing email
router.post('/', async (req, res) => {
  try {
    const { email, score } = req.body;

    // Validate input (you can add more validation as needed)
    if (!email) {
      return res.status(400).json({ message: 'Invalid input data' });
    }

    // Check if a game data point already exists for the provided email
    let game = await Game.findOne({ email });

    if (game) {
      // If a game data point exists, update the score if the new score is higher
      if (score > game.score) {
        game.score = score;
        await game.save();
      }
    } else {
      // If no game data point exists, create a new one
      game = new Game({ email, score });
      await game.save();
    }

    res.status(201).json(game);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
