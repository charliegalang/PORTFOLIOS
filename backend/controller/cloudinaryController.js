import cloudinary from '../config/cloudinary.js';

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Convert buffer to base64
    const fileStr = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    const tag = req.body.tag || 'general';

    const uploadOptions = {
      tags: [tag],
      resource_type: "auto",
      timeout: 60000, // Increase timeout to 60 seconds
    };

    // Use either VITE_ or standard preset name
    const preset = process.env.VITE_CLOUDINARY_UPLOAD_PRESET || process.env.CLOUDINARY_UPLOAD_PRESET;
    if (preset) {
      uploadOptions.upload_preset = preset;
    }

    const uploadResponse = await cloudinary.uploader.upload(fileStr, uploadOptions);

    res.status(200).json({
      url: uploadResponse.secure_url,
      public_id: uploadResponse.public_id,
      version: uploadResponse.version
    });
  } catch (error) {
    console.error('Cloudinary Upload Error Detail:', error);
    res.status(500).json({
      message: 'Upload failed due to timeout or network error',
      error: error.message
    });
  }
};

export const getImagesByTag = async (req, res) => {
  try {
    const { tag } = req.params;

    // Check for either VITE_ or standard cloud name
    const cloudName = process.env.VITE_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME;
    if (!cloudName) {
      throw new Error("Cloudinary configuration missing in backend/.env");
    }

    const result = await cloudinary.api.resources_by_tag(tag, {
      max_results: 100,
    });

    const images = result.resources.map(res => ({
      url: res.secure_url,
      public_id: res.public_id,
      version: res.version
    }));

    res.status(200).json(images);
  } catch (error) {
    console.error('Cloudinary Fetch Error Detail:', error);
    res.status(500).json({
      message: 'Failed to fetch images',
      error: error.message
    });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id) {
      return res.status(400).json({ message: 'Public ID is required' });
    }

    const result = await cloudinary.uploader.destroy(public_id);
    res.status(200).json({ message: 'Image deleted successfully', result: result.result });
  } catch (error) {
    console.error('Cloudinary Delete Error Detail:', error);
    res.status(500).json({ message: 'Delete failed', error: error.message });
  }
};
