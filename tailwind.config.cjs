/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
    "./index.html","./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'profile-banner': "url('./src/assets/bg-profile-page.png')",
        "shop-banner": "url('./src/assets/shop-online.png')",
        "card-banner": "url('./src/assets/card-img.png')",
      },
    },
  },
  plugins: [],
}
