const mongoose = require('mongoose');

const footerContentSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  text: { type: String, default: '' },
  email: { type: String, default: '' },
  copyright: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('FooterContent', footerContentSchema);