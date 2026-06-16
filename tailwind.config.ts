import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          50: '#f0fdff',
          100: '#ccf7fe',
          200: '#99eefd',
          300: '#4ddffb',
          400: '#06c7f2',
          500: '#00aad4',
          600: '#0088b0',
          700: '#006d8e',
          800: '#065974',
          900: '#0a4a61',
        },
        sand: {
          50: '#fefdf8',
          100: '#fdf8e8',
          200: '#fbf0c5',
          300: '#f7e295',
          400: '#f2cd5c',
          500: '#ecb830',
        }
      }
    },
  },
  plugins: [],
}
export default config
