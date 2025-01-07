// styles/design-system.js

// Color Palette
export const colors = {
  primary: {
    blue: '#3856DD',
    backgroundCream: '#FFF6F0'
  },
  secondary: {
    accentGray: '#324DC7',
    textGray: 'rgba(56, 86, 221, 0.8)'
  },
  semantic: {
    success: '#2ECC71',
    warning: '#F39C12',
    error: '#E74C3C'
  }
};

// Typography
export const typography = {
  fontFamily: {
    primary: '"Times New Roman", Times, serif',
    fallback: 'Georgia, serif'
  },
  sizes: {
    h1: '2.5rem',   // 40px
    h2: '2rem',     // 32px
    h3: '1.5rem',   // 24px
    h4: '1.25rem',  // 20px
    h5: '1rem',     // 16px
    h6: '0.875rem', // 14px
    body: '1rem'    // 16px
  },
  weights: {
    normal: 400,
    bold: 700
  },
  lineHeight: 1.6,
  letterSpacing: '0.02em'
};

// Spacing System
export const spacing = {
  base: 8,
  scale: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48
  }
};

// Grid System
export const grid = {
  maxWidth: '1200px',
  columns: 12,
  gutter: 24,
  breakpoints: {
    mobile: 600,
    tablet: { min: 600, max: 1024 },
    desktop: 1024
  }
};

// Component Styles
export const componentStyles = {
  button: {
    primary: {
      backgroundColor: colors.primary.blue,
      color: colors.primary.backgroundCream,
      fontFamily: typography.fontFamily.primary,
      padding: '12px 24px',
      border: 'none',
      transition: 'background-color 0.3s ease',
      hoverBackgroundColor: colors.secondary.accentGray
    },
    secondary: {
      backgroundColor: 'transparent',
      color: colors.primary.blue,
      border: `2px solid ${colors.primary.blue}`
    }
  },
  input: {
    fontFamily: typography.fontFamily.primary,
    borderColor: colors.primary.blue,
    backgroundColor: colors.primary.backgroundCream,
    padding: '12px',
    focusBorderColor: colors.secondary.accentGray
  },
  card: {
    backgroundColor: 'white',
    border: '1px solid rgba(56, 86, 221, 0.1)',
    padding: '24px',
    boxShadow: '0 2px 4px rgba(56, 86, 221, 0.05)'
  }
};

// Accessibility Guidelines
export const accessibility = {
  minColorContrast: 4.5,
  minTouchTarget: {
    width: 44,
    height: 44
  }
};

// Interaction States
export const interactionStates = {
  hover: {
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  active: {
    transform: 'scale(0.98)'
  },
  disabled: {
    opacity: 0.5,
    cursor: 'not-allowed'
  }
};

// Utility Functions
export const utils = {
  // Convert px to rem
  pxToRem: (px) => `${px / 16}rem`,
  
  // Generate responsive font size
  responsiveFontSize: (base, min, max) => ({
    fontSize: base,
    '@media (max-width: 600px)': {
      fontSize: min
    },
    '@media (min-width: 1200px)': {
      fontSize: max
    }
  })
};

// Design System Version
export const version = {
  current: '1.0.0',
  lastUpdated: new Date('2025-01-15')
};

export default {
  colors,
  typography,
  spacing,
  grid,
  componentStyles,
  accessibility,
  interactionStates,
  utils,
  version
};