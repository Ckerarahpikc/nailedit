import { createGlobalStyle } from "styled-components";
// import "https://fonts.googleapis.com/css?family=Playfair+Display:regular,500,600,700,800,900,italic,500italic,600italic,700italic,800italic,900italic";
// import "https://fonts.googleapis.com/css?family=Lato:100,100italic,300,300italic,regular,italic,700,700italic,900,900italic";

const GlobalStyles = createGlobalStyle`
:root {
  /* Gold/Beige Primary Palette */
  --color-brand-50: #fffaf0;
  --color-brand-100: #fef3c7;
  --color-brand-200: #fde68a;
  --color-brand-500: #d4af37; /* Gold */
  --color-brand-600: #b8860b; /* Dark Gold */
  --color-brand-700: #8b7500; /* Deep Gold */
  --color-brand-800: #6d5c00; /* Rich Gold */
  --color-brand-900: #4a3c00; /* Dark Brown-Gold */

  /* Warm Beige and Brown Accents */
  --color-beige-50: #faf5ef;
  --color-beige-100: #f5ebdc;
  --color-beige-200: #e8d8c0;
  --color-beige-500: #c2a78b;
  --color-beige-600: #a38567;
  --color-beige-700: #7d664e;
  --color-beige-800: #5c4b3a;
  --color-beige-900: #3e3227;

  /* Neutral Greys for Depth */
  --color-grey-0: #ffffff;
  --color-grey-50: #f9f9f9;
  --color-grey-100: #f3f3f3;
  --color-grey-200: #e0e0e0;
  --color-grey-300: #c7c7c7;
  --color-grey-400: #a0a0a0;
  --color-grey-500: #7a7a7a;
  --color-grey-600: #5c5c5c;
  --color-grey-700: #3f3f3f;
  --color-grey-800: #2b2b2b;
  --color-grey-900: #1a1a1a;

  /* Contrast Colors */
  --color-soft-pink: #f8e1e7; /* Soft Feminine Touch */
  --color-soft-white: #fffaf5;
  --color-deep-brown: #5d4037;

  /* Shadows for Premium Feel */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.15);

  /* Borders and Radius */
  --border-radius-tiny: 3px;
  --border-radius-sm: 5px;
  --border-radius-md: 8px;
  --border-radius-lg: 12px;

  /* For dark mode */
  --image-grayscale: 0;
  --image-opacity: 100%;
}

/* Reset and Base Styles */
*, *::before, *::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  transition: background-color 0.3s, border 0.3s;
}

html {
  font-size: 62.5%;
}

body {
  color: var(--color-grey-700);
  background-color: var(--color-soft-pink);
  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  line-height: 1.5;
  font-size: 1.6rem;
}

input, button, textarea, select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
  background-color: var(--color-brand-500);
  color: var(--color-grey-0);
  border: none;
  padding: 0.8rem 1.6rem;
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
}

button:hover {
  background-color: var(--color-brand-600);
  box-shadow: var(--shadow-lg);
}

button:disabled {
  background-color: var(--color-grey-300);
  cursor: not-allowed;
}

input:focus, button:focus, textarea:focus, select:focus {
  outline: 2px solid var(--color-brand-600);
  outline-offset: -1px;
}

a {
  color: var(--color-brand-600);
  text-decoration: none;
  transition: color 0.2s;
}

a:hover {
  color: var(--color-brand-700);
}

ul {
  list-style: none;
}

p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

img {
  max-width: 100%;
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}
`;

/* Dark Mode */
// @media (prefers-color-scheme: dark) {
//   :root {
//     --color-grey-0: #1a1a1a;
//     --color-grey-50: #2b2b2b;
//     --color-grey-100: #3f3f3f;
//     --color-grey-200: #5c5c5c;
//     --color-grey-300: #7a7a7a;
//     --color-grey-400: #a0a0a0;
//     --color-grey-500: #c7c7c7;
//     --color-grey-600: #e0e0e0;
//     --color-grey-700: #f3f3f3;
//     --color-grey-800: #f9f9f9;
//     --color-grey-900: #ffffff;

//     --color-brand-500: #c2a372;
//     --color-brand-600: #9c7f4b;
//     --color-brand-700: #7d6641;

//     --backdrop-color: rgba(0, 0, 0, 0.3);
//     --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
//     --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
//     --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);

//     --image-grayscale: 10%;
//     --image-opacity: 90%;
//   }
// }

export default GlobalStyles;
