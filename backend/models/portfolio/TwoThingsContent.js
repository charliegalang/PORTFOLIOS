const mongoose = require('mongoose');

const twoThingsContentSchema = new mongoose.Schema({
  title: { type: String, default: 'Two Things' },
  subtitle: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('TwoThingsContent', twoThingsContentSchema);