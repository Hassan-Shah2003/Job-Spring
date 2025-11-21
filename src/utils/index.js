// Save data to LocalStorage
export const saveToLocal = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error("❌ LocalStorage Save Error:", err);
  }
};

// Get data from LocalStorage
export const getFromLocal = (key) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (err) {
    console.error("❌ LocalStorage Get Error:", err);
    return null;
  }
};

// Remove a key
export const removeFromLocal = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error("❌ LocalStorage Remove Error:", err);
  }
};

// Clear all
export const clearLocal = () => {
  try {
    localStorage.clear();
  } catch (err) {
    console.error("❌ LocalStorage Clear Error:", err);
  }
};
