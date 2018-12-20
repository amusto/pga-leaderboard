const mongoose = require('mongoose');
const { Schema } = mongoose;

const playerSchema = new Schema({
    first_name: String,
    last_name: String,
    score: { type: Number, default: 0 }
});

mongoose.model('players', playerSchema);