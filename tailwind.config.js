/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#030712',
          900: '#0A192F',
          800: '#112240',
          700: '#233554',
          600: '#1E3A8A',
        },
        white: {
          DEFAULT: '#FFFFFF',
          50: '#F8FAFC',
          100: '#F1F5F9',
        },
        accent: {
          blue: '#3B82F6',
          light: '#60A5FA',
          sky: '#38BDF8',
          indigo: '#6366F1',
          violet: '#8B5CF6',
        }
      },
    },
  },
  plugins: [],
};
