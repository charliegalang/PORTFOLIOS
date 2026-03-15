const mongoose = require('mongoose');

const responsibilitySchema = new mongoose.Schema({
  id: { type: String, required: true },
  text: { type: String, default: '' }
});

const workSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, default: '' },
  company: { type: String, default: '' },
  period: { type: String, default: '' },
  type: { type: String, default: '' },
  responsibilities: [responsibilitySchema]
});

const educationSchema = new mongoose.Schema({
  degree: { type: String, default: '' },
  school: { type: String, default: '' },
  period: { type: String, default: '' }
});

const experienceSchema = new mongoose.Schema({
  professionalSummaryTitle: { type: String, default: 'Professional Summary' },
  summary: { type: String, default: '' },
  workHistoryTitle: { type: String, default: 'Work History' },
  work: [workSchema],
  educationTitle: { type: String, default: 'Education' },
  education: educationSchema
}, { timestamps: true });

module.exports = mongoose.model('Experience', experienceSchema);