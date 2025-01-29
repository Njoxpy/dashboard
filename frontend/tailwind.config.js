/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        announceBg: "#242833",
        announceCta: "#43A047",
        secondary: "#2b3452",
        whit: "#bbb",
        footerBg: "#242833",
        footerText: "#ffffff",
        footerLinkColor: "#43A047",

        navigation: {
          navBg: "#121212",
          navText: "#ffffff",
          navCTA: "#43A047"
        },
        hello: {
          helloText: "#ffffff",
          helloCta: "#43A047"
        },
        latestBlogs: {
          latestBg: "#ffffff",
          latestTitle: "#121212",
          latestExcerpt: "#242833",
          latestCTA: "43A047"
        },
        subscribe: {
          sBg: "#121212",
          sTxt: "#fff",
          sInputField: "43A047",
          sCTA: "#43A047"
        }
      }
    },
  },
  plugins: [],
}
