/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'clr-base': '#f4dcd6',
        'clr-accent': '#e7b5ad',
        'clr-primary': '#d81b60',
        'clr-primary-light': '#f8d3cc',
        'clr-text': '#333333',
        'clr-dark': '#111111',
      },
      fontFamily: {
        headingSerif: ['"Playfair Display"', 'serif'],
        bodySans: ['Poppins', 'sans-serif'],
        scriptAccent: ['"Dancing Script"', 'cursive'],
      },
      fontSize: {
        'h1-size': 'clamp(2.2rem, 5vw, 3.8rem)',
        'h2-size': 'clamp(1.6rem, 4vw, 2.4rem)',
        'body-size': '1rem',
      },
      letterSpacing: {
        'tracking-heading': '0.02em',
        'tracking-body': '0.01em',
      },
      lineHeight: {
        'body': '1.6',
      },
      maxWidth: {
        'container': '1200px',
      },
      padding: {
        'section-y': '4rem',
      },
      gap: {
        'section-gap': '2rem',
      },
      gridTemplateColumns: {
        'desktop': 'repeat(12, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
