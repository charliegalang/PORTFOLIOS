const mongoose = require('mongoose');

const statSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  n: { type: String, default: '' },
  l: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Stat', statSchema);