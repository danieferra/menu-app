// Spinner.js
import React from 'react';

const Spinner = () => (
  <div className="spinner" style={{
    border: "4px solid rgba(0, 0, 0, .1)",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    borderLeftColor: "black",
    animation: "spin 1s linear infinite",
  }}></div>
);

export default Spinner;

// Add this CSS rule to your index.css or App.css
// If you're using CSS modules or styled-components, adjust accordingly.