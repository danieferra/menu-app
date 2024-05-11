import React from 'react';
import Spinner from './Spinner'; // Make sure the path is correct

const FullScreenSpinner = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', // Use 100vh to make the container full-screen
      width: '100vw' // Use 100vw to ensure it spans the full viewport width
    }}>
      <Spinner />
    </div>
  );
};

export default FullScreenSpinner;