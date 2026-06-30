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
        position="bottom-right" 
        theme="dark"
        closeButton
        toastOptions={{
          unstyled: true,
          classNames: {
            toast: 'group pointer-events-auto relative flex w-full items-center gap-3.5 overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800/95 p-4 pr-10 text-slate-100 shadow-2xl backdrop-blur-xl transition-all duration-300 font-sans border-l-4',
            title: 'text-[14px] font-semibold text-slate-100 leading-tight',
            description: 'text-xs text-slate-400 font-normal mt-1 leading-normal',
            success: '!border-l-emerald-500 !bg-emerald-950/25',
            error: '!border-l-rose-500 !bg-rose-950/25',
            warning: '!border-l-amber-500 !bg-amber-950/25',
            info: '!border-l-blue-500 !bg-blue-950/25',
            actionButton: 'bg-indigo-600 text-white hover:bg-indigo-500 transition-colors font-semibold text-xs px-3 py-1.5 rounded-md shadow-sm',
            cancelButton: 'bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors font-medium text-xs px-3 py-1.5 rounded-md border border-slate-700/50',
            closeButton: 'absolute right-3 top-1/2 -translate-y-1/2 bg-slate-900/50 border border-slate-700/50 text-slate-400 hover:text-slate-200 hover:bg-slate-800 backdrop-blur-md rounded-md p-1 transition-all',
          },
        }}
      />
      </body>
    </html>
  );
}
