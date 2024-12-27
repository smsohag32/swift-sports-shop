export const setToLocalStorage = (key, value) => {
   if (!key || typeof window === "undefined") {
      return;
   }
   try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
   } catch (error) {
      console.error("Error saving to localStorage", error);
   }
};

export const getFromLocalStorage = (key) => {
   if (!key || typeof window === "undefined") {
      return null;
   }
   try {
      const serializedValue = localStorage.getItem(key);
      return serializedValue ? JSON.parse(serializedValue) : null;
   } catch (error) {
      console.error("Error reading from localStorage", error);
      return null;
   }
};

export const removeFromLocalStorage = (key) => {
   if (!key || typeof window === "undefined") {
      return;
   }
   try {
      localStorage.removeItem(key);
   } catch (error) {
      console.error("Error removing from localStorage", error);
   }
};
