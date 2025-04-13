/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/pages/**/*.{js,ts,jsx,tsx}",
      "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          // Dashboard color scheme
          'cliveden': '#01FFFF',
          'chewton': '#8B5CF6',
          'grove': '#34D399',
          'gleneagles': '#F59E0B',
          'oldcourse': '#8B5CF6',
          'beaverbrook': '#BFDBFE',
          'headfield': '#374151',
          'cameron': '#EF4444',
          'coworth': '#3B82F6',
          'fourseasons': '#60A5FA',
          'newt': '#10B981',
        },
        fontFamily: {
          sans: [
            'Inter',
            'ui-sans-serif',
            'system-ui',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
          ],
        },
        fontSize: {
          'xxs': '0.625rem',
        },
        spacing: {
          '128': '32rem',
        },
        opacity: {
          '85': '0.85',
        },
      },
    },
    plugins: [],
  };