import React from 'react';
import '../style/PopUpCard.css'

const PopUpCard = ({ onClose }) => {
  return (
    <div className="popup-card">
      <div className="popup-content">
        <span className="close-btn" onClick={onClose}>
          &times;
        </span>
        <h2>Login Required</h2>
        <p>You need to be logged in to use this function.</p>
        {/* Add login button or link here if needed */}
      </div>
    </div>
  );
};

export default PopUpCard;