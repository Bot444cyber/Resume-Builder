
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../context/ThemeProvider";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "ResumeLeader - Build Your Career with Precision",
  description: "The world's most advanced platform for career branding and resume engineering.",
  icons: {
    icon: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${plusJakarta.variable} antialiased bg-white dark:bg-black text-slate-900 dark:text-white overflow-x-hidden selection:bg-blue-600 selection:text-white transition-colors duration-300`}>
        <ThemeProvider>
          <div className="noise-overlay"></div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
