/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bistre: {
          50: '#69433A',
          100: '#402923'
        },
        jasper: {
          50: '#D8876F',
          100: '#C95B38'
        },
        beaver: {
          50: '#BFAA9C',
          100: '#A78A77'
        },
        pearl: {
          50: '#F9F6F0',
          100: '#E6D8BD'
        },
        night: {
          100: '#101010',
          50: '#1F1F1F'
        }
      }
    },
  },
  plugins: [],
}

