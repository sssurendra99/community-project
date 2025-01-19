import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

const inter = localFont({
  src: "../public/fonts/inter/Inter-VariableFont_opsz,wght.ttf",
  variable: "--font-inter",
  weight: "400 900",
});

export const metadata: Metadata = {
  title: "WhereMe",
  description: "We sell cloths, women, men, discount, belihuloya",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
