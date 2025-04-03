/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",  // Bao gồm tệp index.html để Tailwind có thể quét các lớp trong đó
      "./src/**/*.{js,jsx,ts,tsx}",  // Bao gồm tất cả các tệp trong thư mục src
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }