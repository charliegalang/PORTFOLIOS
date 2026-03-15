import Portfolio from '../models/Portfolio.js';
import User from '../models/User.js';

// Get the portfolio data (public access)
export const getPortfolio = async (req, res) => {
  try {
    // Try to find the first portfolio in the DB
    let portfolio = await Portfolio.findOne();

    // If no portfolio exists yet, return an empty object with defaults
    // instead of a 404 so the frontend doesn't break
    if (!portfolio) {
      return res.status(200).json({
        gallerySections: [],
        stats: [],
        promiseItems: [],
        heroTitle: "Welcome",
        aboutName: "Your Name"
      });
    }

    res.status(200).json(portfolio);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching portfolio', error: error.message });
  }
};

// Update or Create portfolio data
export const updatePortfolio = async (req, res) => {
  try {
    // TEMPORARY: If no user is logged in (rush mode), we'll just use the first user found or a dummy ID
    // Remove this logic once you have your login system working!
    let userId = req.user?.id;

    if (!userId) {
      const firstUser = await User.findOne();
      if (firstUser) {
        userId = firstUser._id;
      } else {
        // If no user exists at all, we can't save because of the 'required' field in the model
        return res.status(400).json({ message: 'Please register at least one user in the database first.' });
      }
    }

    const updateData = req.body;

    // Use findOneAndUpdate with upsert: true to create if it doesn't exist
    const portfolio = await Portfolio.findOneAndUpdate(
      {}, // Find any portfolio (since you likely only have one for now)
      { ...updateData, user: userId },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json({ message: 'Portfolio saved to database!', portfolio });
  } catch (error) {
    console.error("Save Error:", error);
    res.status(500).json({ message: 'Error updating portfolio', error: error.message });
  }
};
