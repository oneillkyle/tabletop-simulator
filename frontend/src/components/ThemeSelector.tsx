import React from 'react';
import { themes } from '../theme/themes';

export default function ThemeSelector({ setTheme }: { setTheme: (t: any) => void }) {
  return (
    <div style={{ padding: '1rem', backgroundColor: '#111', color: 'white' }}>
      <h3>🎨 Select Theme</h3>
      {Object.entries(themes).map(([key, theme]) => (
        <button key={key} onClick={() => setTheme(theme)} style={{ margin: '0.5rem' }}>
          {theme.name}
        </button>
      ))}
    </div>
  );
}
