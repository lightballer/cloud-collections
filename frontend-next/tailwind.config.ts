import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/(pages)/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: (theme) => ({
        primary: theme.colors.slate[300],
      }),
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
