/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');

// Rotate X utilities
const rotateY = plugin(function ({ addUtilities }) {
  addUtilities({
    '.rotate-y-180': {
      transform: 'rotateY(180deg)',
    },
  });
});

const perspective = plugin(function ({ addUtilities }) {
  addUtilities({
    '.perspective-1000': {
        perspective: '1000px'
    },
  });
});

const backfaceVisibility = plugin(function ({ addUtilities }) {
  addUtilities({
    '.backface-hidden': {
        backfaceVisibility: "hidden"
    },
  });
});

const transformStyle = plugin(function ({ addUtilities }) {
  addUtilities({
    '.transformStyle-preserve': {
      transformStyle: "preserve-3d"
    },
  });
});

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [rotateY, perspective, backfaceVisibility, transformStyle],
}
