// models/Game.js
const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  email: { type: String, required: true },
  score: { type: Number, required: true },
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
