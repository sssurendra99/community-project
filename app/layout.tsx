import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { TanstackProvider } from "@/components/providers/TanstackProvider";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";

const inter = localFont({
  src: "../public/fonts/inter/Inter-VariableFont_opsz,wght.ttf",
  variable: "--font-inter",
  weight: "400 900",
});

export const metadata: Metadata = {
  title: "WhereMe",
  description: "We sell cloths for women, men, discount, belihuloya",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  return (
    <SessionProvider session={session}>
    <html lang="en">
      <body className={inter.className}>
        <TanstackProvider>
          {children}
        </TanstackProvider>
      </body>
    </html>
    </SessionProvider>
  );
}
