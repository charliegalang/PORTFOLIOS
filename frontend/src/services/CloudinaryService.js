const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const uploadToCloudinary = async (file, tag) => {
  if (!file) return null;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('tag', tag);

  try {
    const response = await fetch(`${API_URL}/cloudinary/upload`, {
      method: 'POST',
      // Authorization token if needed
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || 'Upload failed');
    return data;
  } catch (error) {
    console.error('Upload Error:', error);
    return null;
  }
};

export const fetchImagesByTag = async (tag) => {
  try {
    const response = await fetch(`${API_URL}/cloudinary/list/${tag}`);
    if (!response.ok) return [];
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch Error:', error);
    return [];
  }
};

export const deleteFromCloudinary = async (public_id) => {
  try {
    const response = await fetch(`${API_URL}/cloudinary/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ public_id }),
    });

    const data = await response.json();
    return response.ok;
  } catch (error) {
    console.error('Delete Error:', error);
    return false;
  }
};
