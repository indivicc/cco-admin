// Updated components/DesignSystem/BaseComponents.js
import React from 'react';
import * as DesignSystem from '../../styles/design-system';

// Updated BaseButton for 90's Style
export const BaseButton = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  disabled = false,
  ...props 
}) => {
  const baseStyles = {
    fontFamily: 'Courier New, monospace',
    textTransform: 'lowercase',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    border: '3px solid black',
    padding: '10px 20px',
    transition: 'background-color 0.3s ease',
  };

  const variantStyles = {
    primary: {
      ...baseStyles,
      backgroundColor: '#3856DD',
      color: '#FFF6F0',
      '&:hover': {
        backgroundColor: '#293BB2',
      },
    },
    secondary: {
      ...baseStyles,
      backgroundColor: '#FFF6F0',
      color: '#3856DD',
      '&:hover': {
        backgroundColor: '#D9E3F0',
      },
    },
  };

  return (
    <button
      style={variantStyles[variant]}
      className={`cco-button cco-button--${variant} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

// Updated BaseInput for Retro Style
export const BaseInput = ({ className = '', disabled = false, ...props }) => {
  const inputStyles = {
    fontFamily: 'Courier New, monospace',
    border: '3px solid #3856DD',
    backgroundColor: '#FFF6F0',
    color: '#3856DD',
    padding: '10px',
    width: '100%',
    boxSizing: 'border-box',
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? 'not-allowed' : 'text',
  };

  return (
    <input
      style={inputStyles}
      className={`cco-input ${className}`}
      disabled={disabled}
      {...props}
    />
  );
};

// Base Card Component
export const BaseCard = ({ children, className = '', ...props }) => {
  const cardStyles = {
    fontFamily: 'Courier New, monospace',
    border: '3px solid #3856DD',
    backgroundColor: '#FFF6F0',
    padding: '20px',
    margin: '10px 0',
  };

  return (
    <div style={cardStyles} className={`cco-card ${className}`} {...props}>
      {children}
    </div>
  );
};

// Typography Components
export const H1 = ({ children, ...props }) => (
  <h1
    style={{
      fontFamily: 'Courier New, monospace',
      fontSize: '24px',
      color: '#3856DD',
    }}
    {...props}
  >
    {children}
  </h1>
);

export const H2 = ({ children, ...props }) => (
  <h2
    style={{
      fontFamily: 'Courier New, monospace',
      fontSize: '20px',
      color: '#3856DD',
    }}
    {...props}
  >
    {children}
  </h2>
);

// Export all components
export default {
  BaseButton,
  BaseInput,
  BaseCard,
  H1,
  H2,
};
