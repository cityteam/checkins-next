import daisyui from "daisyui";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
// Initially from "https://daisyui.com/docs/config"
// daisyUI config (optional - here are the default values)
  daisyui: {
    base: true, // applies background color and foreground color for root element by default
    darkTheme: "dark", // name of one of the included themes for dark mode
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    styled: true, // include daisyUI colors and design decisions for all components
    themeRoot: ":root", // The element that receives theme color CSS variables
    themes: false, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    utils: true, // adds responsive and modifier utility classes
  },
  plugins: [
    daisyui,
  ],
};
export default config;
