import React from 'react';


const MotivationalPopup = ({ onClose }) => {
  return (
    <div className="motivational-popup">
      <div className="popup-content">
        <p>"El único modo de hacer un gran trabajo, es amar lo que haces."</p>
        <p>- Steve Jobs</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default MotivationalPopup;
