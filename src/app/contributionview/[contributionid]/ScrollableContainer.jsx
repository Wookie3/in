import React from 'react';

const ScrollableContainer = ({ children }) => (
  <div className="scrollable-container">
    {children}
    <style jsx>{`
      .scrollable-container {
        max-height: 250px; /* Set the desired height */
        overflow-y: auto;
        border: 1px solid black; /* Optional: Add a border for better visibility */
      }
    `}</style>
  </div>
);

export default ScrollableContainer;