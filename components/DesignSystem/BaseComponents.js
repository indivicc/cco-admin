// Updated components/DesignSystem/BaseComponents.js
import React from 'react';
import * as DesignSystem from '../../styles/design-system';

// BaseButton for 90's Style
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
    cursor: disabled ? DesignSystem.interactionStates.disabled.cursor : 'pointer',
    opacity: disabled ? DesignSystem.interactionStates.disabled.opacity : 1,
    padding: DesignSystem.componentStyles.button.primary.padding,
    transition: DesignSystem.componentStyles.button.primary.transition,
    textAlign: 'center',
    border: variant === 'secondary'
      ? DesignSystem.componentStyles.button.secondary.border
      : 'none',
  };

  const variantStyles = {
    primary: {
      backgroundColor: DesignSystem.componentStyles.button.primary.backgroundColor,
      color: DesignSystem.componentStyles.button.primary.color,
    },
    secondary: {
      backgroundColor: DesignSystem.componentStyles.button.secondary.backgroundColor,
      color: DesignSystem.componentStyles.button.secondary.color,
    },
  };

  const combinedStyles = {
    ...baseStyles,
    ...variantStyles[variant],
  };

  return (
    <button
      style={combinedStyles}
      className={`cco-button cco-button--${variant} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

// BaseInput for Retro Style
export const BaseInput = ({ className = '', disabled = false, ...props }) => {
  const inputStyles = {
    fontFamily: DesignSystem.componentStyles.input.fontFamily,
    border: `3px solid ${DesignSystem.componentStyles.input.borderColor}`,
    backgroundColor: DesignSystem.componentStyles.input.backgroundColor,
    color: DesignSystem.colors.primary.blue,
    padding: DesignSystem.componentStyles.input.padding,
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
    border: DesignSystem.componentStyles.card.border,
    backgroundColor: DesignSystem.componentStyles.card.backgroundColor,
    padding: DesignSystem.componentStyles.card.padding,
    boxShadow: DesignSystem.componentStyles.card.boxShadow,
    margin: DesignSystem.spacing.scale.sm,
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
      fontFamily: DesignSystem.typography.fontFamily.primary,
      fontSize: DesignSystem.typography.sizes.h1,
      color: DesignSystem.colors.primary.blue,
      lineHeight: DesignSystem.typography.lineHeight,
      letterSpacing: DesignSystem.typography.letterSpacing,
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
      color: DesignSystem.colors.primary.blue,
      lineHeight: DesignSystem.typography.lineHeight,
      letterSpacing: DesignSystem.typography.letterSpacing,
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
