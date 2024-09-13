import { Config } from "tailwindcss";

/** @type {import('tailwindcss').Config} */
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        default: "var(--vms-bg)",
        subtle: "var(--vms-bg-subtle)",
        success: "var(--vms-bg-success)",
        muted: "var(--vms-border-muted)",
        inverted: "var(--vms-bg-inverted)",
        emphasis: "var(--vms-bg-emphasis)",
        light: "var(--vms-brand-muted-light)",
        error: "var( --vms-bg-dark-error)",

        brand: {
          default: "var(--vms-brand, #ED1C24)",
          emphasis: "var(--vms-brand-emphasis,#fff)",
          light: "var(--vms-brand-light, #ED1C24)",
          muted: "var(--vms-brand-muted)",
          accent: "var(--vms-brand-accent, #fff)",
          sidebar: "var(--vms-brand-sidebar, #fff)",
          subtle: "var(--vms-brand-subtle, #fde8e9)",
        },
      },

      borderColor: {
        error: "var(--vms-border-error)",
        success: "var(--vms-bg-success)",
        default: "var(--vms-border)",
        muted: "var(--vms-border-muted)",
        focus: "var(--vms-border-focus)",
        brand: "var(--vms-border-brand)",
      },

      textColor: {
        default: "var(--vms-text)",
        success: "--var(--vms-text-success)",
        error: "var(--vms-text-error)",
        brand: "var(--vms-brand-text)",
        muted: "var(--vms-text-muted)",
        subtle: "var(--vms-text-subtle)",
        solid: "var(--vms-brand-solid-text)",
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

        lato: ["var(--vms-font-lato)"],
      },
    },
  },
  plugins: [],
};

export default config;
