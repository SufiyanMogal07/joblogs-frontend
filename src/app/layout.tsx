import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JobLog | Job Tracker",
  description:
    "A simple way to stay on top of every application in one place. This job tracker lets you quickly add new roles, update their status as you move from applied to interview to offer, and keep important notes alongside each opportunity. Over time, you can see how your job search is progressing, remember where you left off with each company, and plan your next follow-ups with confidence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased bg-slate-950 text-white md:px-8 md:py-3 max-w-400 mx-auto`}
      >
        {children}
      </body>
    </html>
  );
}
