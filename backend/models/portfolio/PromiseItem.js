const mongoose = require('mongoose');

const promiseItemSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  n: { type: String, default: '' },
  t: { type: String, default: '' },
  d: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('PromiseItem', promiseItemSchema);