// src/utils/storage.js
export const storage = {
  get(key, defaultValue = null) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : defaultValue;
    } catch (e) {
      console.warn('Corrupted localStorage for', key, e);
      localStorage.removeItem(key);
      return defaultValue;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Failed to write to localStorage', key, e);
    }
  },
  remove(key) {
    localStorage.removeItem(key);
  },
};
