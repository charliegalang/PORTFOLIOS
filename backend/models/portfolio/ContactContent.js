const mongoose = require('mongoose');

const contactContentSchema = new mongoose.Schema({
  title: { type: String, default: '' },
  text: { type: String, default: '' },
  button: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('ContactContent', contactContentSchema);