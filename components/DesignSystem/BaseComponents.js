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
  // Base button styles
  const baseStyles = {
    fontFamily: DesignSystem.typography.fontFamily.primary,
    textTransform: 'lowercase',
    cursor: disabled ? DesignSystem.interactionStates.disabled.cursor : 'pointer',
    opacity: disabled ? DesignSystem.interactionStates.disabled.opacity : 1,
    border: '3px solid black',
    padding: '10px 20px',
    transition: 'background-color 0.3s ease',
    display: 'inline-block',
    textAlign: 'center',
  };

  // Styles for primary and secondary variants
  const variantStyles = {
    primary: {
      backgroundColor: DesignSystem.colors.primary.blue,
      color: DesignSystem.colors.primary.backgroundCream,
    },
    secondary: {
      backgroundColor: DesignSystem.colors.primary.backgroundCream,
      color: DesignSystem.colors.primary.blue,
    },
  };

  // Merge base styles with the variant styles
  const combinedStyles = {
    ...baseStyles,
    ...variantStyles[variant],
  };

  return (
    <button
      style={combinedStyles} // Apply the merged styles
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
    fontFamily: DesignSystem.typography.fontFamily.primary,
    border: `3px solid ${DesignSystem.colors.primary.blue}`,
    backgroundColor: DesignSystem.colors.primary.backgroundCream,
    color: DesignSystem.colors.primary.blue,
    padding: '10px',
    width: '100%',
    boxSizing: 'border-box',
    opacity: disabled ? DesignSystem.interactionStates.disabled.opacity : 1,
    cursor: disabled ? DesignSystem.interactionStates.disabled.cursor : 'text',
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

// BaseCard Component
export const BaseCard = ({ children, className = '', ...props }) => {
  const cardStyles = {
    fontFamily: DesignSystem.typography.fontFamily.primary,
    border: `3px solid ${DesignSystem.colors.primary.blue}`,
    backgroundColor: DesignSystem.colors.primary.backgroundCream,
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
export const H1 = ({ children, variant = 'default', ...props }) => {
  const styles = {
    default: {
      fontFamily: DesignSystem.typography.fontFamily.primary,
      fontSize: DesignSystem.typography.sizes.h1,
      color: DesignSystem.colors.primary.blue,
      lineHeight: DesignSystem.typography.lineHeight,
    },
    onBlue: {
      fontFamily: DesignSystem.typography.fontFamily.primary,
      fontSize: DesignSystem.typography.sizes.h1,
      color: DesignSystem.colors.primary.backgroundCream, // Warm white color for blue background
      lineHeight: DesignSystem.typography.lineHeight,
    },
  };

  return (
    <h1
      style={styles[variant]}
      className={`h1-${variant}`}
      {...props}
    >
      {children}
    </h1>
  );
};

export const H2 = ({ children, ...props }) => (
  <h2
    style={{
      fontFamily: DesignSystem.typography.fontFamily.primary,
      fontSize: DesignSystem.typography.sizes.h2,
      color: DesignSystem.colors.primary.blue,
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