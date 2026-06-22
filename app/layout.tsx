import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "BrainClash — Real-time Trivia Battles",
  description:
      "Challenge friends to real-time trivia duels, climb the global leaderboard, and test your knowledge across 12 categories.",
  keywords: ["trivia", "quiz", "real-time", "multiplayer", "leaderboard"],
  openGraph: {
    title: "BrainClash — Real-time Trivia Battles",
    description:
        "Challenge friends to head-to-head trivia duels and climb the leaderboard.",
    type: "website",
  },
};

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en" className={`${inter.variable} dark`}>
      <body className="flex min-h-screen flex-col bg-zinc-950 antialiased">
      <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-violet-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <Header />
      {children}
      <Footer />
      </body>
      </html>
  );
}
