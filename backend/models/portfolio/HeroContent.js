const mongoose = require('mongoose');

const heroContentSchema = new mongoose.Schema({
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  profileImage: {
    url: { type: String, default: '' },
    public_id: { type: String, default: '' }
  },
  backgroundImage: {
    url: { type: String, default: '' },
    public_id: { type: String, default: '' }
  }
}, { timestamps: true });

module.exports = mongoose.model('HeroContent', heroContentSchema);