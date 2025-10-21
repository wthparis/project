/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-cream': '#F8F4EF',
        'brand-sage': '#B7C7A3',
        'brand-olive': '#A4B494',
        'brand-earth': '#8B6E4E',
        'brand-rose': '#C5A47E',
        'brand-rose-dark': '#A9865F',
        'brand-charcoal': '#2F2F2F',
        'brand-powder': '#EBD7D1',
        'brand-stone': '#3C3C3C',
      },
      fontFamily: {
        sans: ['"Lato"', '"Open Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
        accent: ['"Montserrat"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 20px 45px -15px rgba(197, 164, 126, 0.25)',
      },
    },
  },
  plugins: [],
};
