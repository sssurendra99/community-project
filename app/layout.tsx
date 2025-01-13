import type { Metadata } from "next";
import "./globals.css";

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
      <body>
        {children}
      </body>
    </html>
  );
}
