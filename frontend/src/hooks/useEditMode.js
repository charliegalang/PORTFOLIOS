import { useState } from 'react';

export const useEditMode = () => {
  const [isEditMode] = useState(() => {
    if (window.location.search.includes('view=public') || window.location.pathname.includes('ronmedina')) return false;
    return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.search.includes('edit=true');
  });

  return isEditMode;
};
