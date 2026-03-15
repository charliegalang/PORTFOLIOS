import mongoose from 'mongoose';

const ResponsibilitySchema = new mongoose.Schema({
  id: String,
  text: String
});

const WorkSchema = new mongoose.Schema({
  id: String,
  title: String,
  company: String,
  period: String,
  type: String,
  responsibilities: [ResponsibilitySchema]
});

const GalleryImageSchema = new mongoose.Schema({
  url: String,
  public_id: String,
  version: Number
});

const GallerySectionSchema = new mongoose.Schema({
  id: String,
  categoryId: String,
  title: String,
  subtitle: String,
  images: [GalleryImageSchema]
});

const PortfolioSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  heroTitle: { type: String, default: '' },
  heroSubtitle: { type: String, default: '' },
  bgUrl: { type: String, default: '' },
  bgId: { type: String, default: '' },

  aboutName: { type: String, default: '' },
  aboutText: { type: String, default: '' },
  profileUrl: { type: String, default: '' },
  profileId: { type: String, default: '' },
  stats: [{
    id: String,
    n: String,
    l: String
  }],

  experienceData: {
    professionalSummaryTitle: { type: String, default: 'Professional Summary' },
    summary: { type: String, default: '' },
    workHistoryTitle: { type: String, default: 'Work History' },
    work: [WorkSchema],
    educationTitle: { type: String, default: 'Education' },
    education: {
      degree: { type: String, default: '' },
      school: { type: String, default: '' },
      period: { type: String, default: '' }
    }
  },

  gallerySections: [GallerySectionSchema],

  twoThingsTitle: { type: String, default: 'Two Things' },
  twoThingsSubtitle: { type: String, default: '' },
  promiseItems: [{
    id: String,
    n: String,
    t: String,
    d: String
  }],

  contactTitle: { type: String, default: '' },
  contactText: { type: String, default: '' },
  contactButton: { type: String, default: '' },

  footerName: { type: String, default: '' },
  footerText: { type: String, default: '' },
  footerEmail: { type: String, default: '' },
  copyright: { type: String, default: '' }

}, { timestamps: true });

export default mongoose.model('Portfolio', PortfolioSchema);
