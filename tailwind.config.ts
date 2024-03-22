import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1985ab',
        secondary: '#d8dd14',
      },
      screens: {
        xxxs: '200px',
        xxs: '300px',
        xs: '450px',
        midLow: '767px',
        midMd: '985px',
        midLg: '1152px',
      },
    },
  },
  plugins: [],
};
export default config;
