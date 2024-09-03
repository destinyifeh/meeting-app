const base = require("@vms/config/tailwind-preset");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "input-border-color": "#1D1D1F",
        default: "var(--vms-bg)",
        subtle: "var(--vms-bg-subtle)",
        brand: {
          default: "var(--vms-brand, #ED1C24)",
          emphasis: "var(--vms-brand-emphasis,#101010)",
        },
      },

      borderColor: {
        error: "var(--vms-border-error)",
        default: "var(--vms-border)",
        focus: "var(--vms-border-focus)",
      },

      textColor: {
        default: "var(--vms-text)",
        success: "--var(--vms-text-success)",
        error: "var(--vms-text-error)",
        brand: "var(--vms-brand-text)",
        muted: "var(--vms-text-muted)",
      },
      fontFamily: {
        sans: [
          "var(--vms-font)",
          "-apple-system,BlinkMacSystemFont",
          "Segoe UI",
          "Roboto,Oxygen,Ubuntu,Cantarell",
          "Open Sans",
          "Helvetica Neue",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [
    //   require("tailwindcss-base-font-size"),
    // // ...
  ],
  ...base,
};
