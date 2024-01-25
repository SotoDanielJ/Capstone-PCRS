import React, { useState } from 'react';
import themeColors from './ThemeColors';

const ThemeSelector = ({ onSelectColor, onClose }) => {
  
  const [selectedColor, setSelectedColor] = useState('');

  const handleColorClick = (color) => {
    setSelectedColor(color);
    onSelectColor(color);
    onClose();
  };

  const colorButtonStyle = {
    width: '1vw',
    height:'4vh',
    
    marginRight: '10px',
  };

  return (
    <div style={{ marginTop: '1vh' }}>
      {themeColors.map((colorObj, index) => (
        <button
          key={index}
          style={{
            ...colorButtonStyle,
            backgroundColor: colorObj.code,
            border: selectedColor === colorObj.code ? '2px solid black' : 'none',
          }}
          onClick={() => handleColorClick(colorObj.code)}
        ></button>
      ))}
    </div>
  );
};

export default ThemeSelector;
