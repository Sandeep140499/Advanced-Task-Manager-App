import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <button onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
    </button>
  );
};

export default ThemeToggle;
