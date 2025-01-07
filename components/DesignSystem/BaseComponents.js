// components/DesignSystem/BaseComponents.js
import React from 'react';
import * as DesignSystem from '../../styles/design-system';

// Base Button Component
export const BaseButton = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  disabled = false,
  ...props 
}) => {
  const baseStyles = {
    fontFamily: DesignSystem.typography.fontFamily.primary,
    textTransform: 'lowercase',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1
  };

  const variantStyles = {
    primary: {
      ...baseStyles,
      backgroundColor: DesignSystem.componentStyles.button.primary.backgroundColor,
      color: DesignSystem.componentStyles.button.primary.color,
      border: 'none',
      padding: DesignSystem.componentStyles.button.primary.padding,
      transition: DesignSystem.componentStyles.button.primary.transition,
      '&:hover': {
        backgroundColor: !disabled ? DesignSystem.componentStyles.button.primary.hoverBackgroundColor : undefined
      }
    },
    secondary: {
      ...baseStyles,
      backgroundColor: DesignSystem.componentStyles.button.secondary.backgroundColor,
      color: DesignSystem.componentStyles.button.secondary.color,
      border: DesignSystem.componentStyles.button.secondary.border,
      '&:hover': {
        backgroundColor: !disabled ? DesignSystem.colors.primary.blue : undefined,
        color: !disabled ? DesignSystem.colors.primary.backgroundCream : undefined
      }
    }
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

// Base Input Component
export const BaseInput = ({ 
  className = '', 
  disabled = false,
  ...props 
}) => {
  const inputStyles = {
    fontFamily: DesignSystem.componentStyles.input.fontFamily,
    border: `2px solid ${DesignSystem.componentStyles.input.borderColor}`,
    backgroundColor: DesignSystem.componentStyles.input.backgroundColor,
    color: DesignSystem.colors.primary.blue,
    padding: DesignSystem.componentStyles.input.padding,
    width: '100%',
    transition: 'border-color 0.3s ease',
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? 'not-allowed' : 'text',
    '&:focus': {
      outline: 'none',
      borderColor: !disabled ? DesignSystem.componentStyles.input.focusBorderColor : undefined
    }
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
export const BaseCard = ({ 
  children, 
  className = '', 
  ...props 
}) => {
  const cardStyles = {
    ...DesignSystem.componentStyles.card,
    fontFamily: DesignSystem.typography.fontFamily.primary
  };

  return (
    <div
      style={cardStyles}
      className={`cco-card ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// Typography Components
export const H1 = ({ children, ...props }) => (
  <h1 
    style={{ 
      fontFamily: DesignSystem.typography.fontFamily.primary,
      fontSize: DesignSystem.typography.sizes.h1,
      fontWeight: DesignSystem.typography.weights.normal,
      textTransform: 'lowercase',
      color: DesignSystem.colors.primary.blue
    }}
    {...props}
  >
    {children}
  </h1>
);

export const H2 = ({ children, ...props }) => (
  <h2 
    style={{ 
      fontFamily: DesignSystem.typography.fontFamily.primary,
      fontSize: DesignSystem.typography.sizes.h2,
      fontWeight: DesignSystem.typography.weights.normal,
      textTransform: 'lowercase',
      color: DesignSystem.colors.primary.blue
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
  H2
};