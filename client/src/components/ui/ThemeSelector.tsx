import React, { useState, useEffect } from 'react';
import themes from '../../data/themes.json';

const ThemeSelector = () => {
  const [currentTheme, setCurrentTheme] = useState('default');

  useEffect(() => {
    const stored = localStorage.getItem('selectedTheme') || 'default';
    setCurrentTheme(stored);
    applyTheme(stored);
  }, []);

  const applyTheme = (themeId) => {
    const theme = themes.themes.find((t) => t.id === themeId);
    if (!theme) return;
    document.body.style.backgroundColor = theme.backgroundColor;
    document.body.style.color = theme.primary;
    localStorage.setItem('selectedTheme', themeId);
  };

  const handleChange = (e) => {
    const selected = e.target.value;
    setCurrentTheme(selected);
    applyTheme(selected);
  };

  return (
    <select value={currentTheme} onChange={handleChange} style={{ marginLeft: '1rem' }}>
      {themes.themes.map((theme) => (
        <option key={theme.id} value={theme.id}>
          {theme.name}
        </option>
      ))}
    </select>
  );
};

export default ThemeSelector;
