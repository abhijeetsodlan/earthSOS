import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { StickyTreeCounter } from "@/components/ui/StickyTreeCounter";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });

export const metadata: Metadata = {
  title: "Earth S.O.S. | Climate Awareness",
  description: "A full-stack climate awareness app with live climate data, calculators, maps, and action tools."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${fraunces.variable} font-sans`}>
        {children}
        <StickyTreeCounter />
      </body>
    </html>
  );
}
