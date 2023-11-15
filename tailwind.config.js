/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '321px',
      },
      colors: {
        v2: {
          green: {
            normal: "#00DBC0",
          },
          blue: {
            dark: "#15172E",
          },
          purple: {
            dark: '#545BAB',
            normal: '#581EFF',
          },
          grey: {
            dark: '#6B7280',
          }
        },
      },
    },
  },
  plugins: [],
};
