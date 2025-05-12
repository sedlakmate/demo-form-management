import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  // @ts-expect-error: daisyui is injected by the plugin
  daisyui: {
    themes: ["light", "dark", "abyss"], // 'cupcake', 'bumblebee', etc.
  },
};
export default config;
