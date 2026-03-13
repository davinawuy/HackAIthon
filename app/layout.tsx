import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GradientMesh } from "@/components/ui/GradientMesh";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Culture Cauldron | Strengthen Communities",
  description:
    "A hackathon-ready AI-powered cultural event discovery platform for safer, friendlier, and stronger communities.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${spaceGrotesk.variable} antialiased`}>
        <GradientMesh />
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
