import React, { useEffect, useState } from 'react';

const Toast = ({ message }) => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);
  if (!visible) return null;
  return (
    <div style={{
      position: 'fixed',
      bottom: '10%',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: '#444',
      color: '#fff',
      padding: '0.75rem 1.5rem',
      borderRadius: '4px',
      zIndex: 1000
    }}>
      {message}
    </div>
  );
};

export default Toast;
