/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Configure CSS modules and global styles
  webpack: (config) => {
    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    });
    return config;
  },

  // Customize import aliases for easier design system imports
  async rewrites() {
    return [
      {
        source: '/design-system/:path*',
        destination: '/styles/:path*',
      },
    ];
  },

  // Env variables for design system version
  env: {
    DESIGN_SYSTEM_VERSION: '1.0.0',
    DESIGN_SYSTEM_LAST_UPDATED: '2025-01-15',
  },

  // Optional: Add any specific optimizations or configurations
  optimizations: {
    // Example: Minimize CSS
    minimizeCSS: true,
  },

  // Specify any additional build-time configurations
  publicRuntimeConfig: {
    designSystem: {
      primaryColor: '#3856DD',
      backgroundColor: '#FFF6F0',
    },
  },
};

module.exports = nextConfig;