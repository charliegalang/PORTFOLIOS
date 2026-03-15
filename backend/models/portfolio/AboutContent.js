const mongoose = require('mongoose');

const aboutContentSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  text: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('AboutContent', aboutContentSchema);