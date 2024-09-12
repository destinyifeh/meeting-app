import type { Metadata } from "next";

import { Lato, Poppins } from "next/font/google";
import "./globals.css";

import AppProvider from "@lib/tanstack-provider";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--vms-font",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--vms-font-lato",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${lato.variable}`}>
      <body className="bg-subtle font-sans antialiased text-base text-black">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
