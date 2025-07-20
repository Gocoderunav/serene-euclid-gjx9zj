import { useState, useEffect } from "react";

export default function useLocaleStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = window.localStorage.getItem(key);
      if (saved === null || saved === "undefined") {
        return initialValue;
      }
      return JSON.parse(saved);
    } catch (error) {
      console.error("Invalid localStorage JSON:", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.log("failed", err);
    }
  }, [key, value]);

  return [value, setValue];
}
