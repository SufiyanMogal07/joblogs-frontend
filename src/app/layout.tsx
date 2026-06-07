import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

// const inter = Inter({
//   variable: "--font-inter",
//   subsets: ["latin"],
// });

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
        className={` antialiased bg-slate-950 max-w-500 mx-auto`}
      >
        {children}
       <Toaster 
        position="top-right" 
        richColors 
        theme="dark"
        closeButton
        toastOptions={{
          classNames: {
            // Lightened to slate-700, added /90 for slight transparency, and a backdrop blur
            toast: 'bg-slate-700/90 backdrop-blur-lg border-slate-600 text-slate-50 shadow-2xl',
            
            // Text adjustments for better contrast against the lighter slate
            description: 'text-slate-300',
            
            // Buttons upgraded to match the new depth
            actionButton: 'bg-slate-100 text-slate-900 hover:bg-slate-200 transition-colors font-medium',
            cancelButton: 'bg-slate-600 text-slate-200 hover:bg-slate-500 transition-colors',
            
            // Close button softened to blend nicely
            closeButton: 'bg-slate-700/50 border-slate-500 text-slate-300 hover:text-slate-50 hover:bg-slate-600 backdrop-blur-md',
          },
        }}
      />
      </body>
    </html>
  );
}
