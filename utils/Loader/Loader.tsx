import React from 'react';
import './loader.css'; // Ensure to create a corresponding CSS file

const Loader: React.FC = () => {
  return (
    <div className="loader-overlay">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
