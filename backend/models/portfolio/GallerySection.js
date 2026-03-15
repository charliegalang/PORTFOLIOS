const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  public_id: { type: String, required: true },
  version: { type: Number, default: Date.now },
  uploadedAt: { type: Date, default: Date.now }
});

const gallerySectionSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  categoryId: { type: String, required: true },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  images: [imageSchema]
}, { timestamps: true });

module.exports = mongoose.model('GallerySection', gallerySectionSchema);