import type { Metadata } from "next";
import { Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/profile";
import { ThemeProvider } from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sora",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: `${profile.name} | ${profile.role || "Developer"}`,
  description: profile.headline,
  keywords: profile.keywords?.join(", "),
  openGraph: {
    title: `${profile.name} | ${profile.role || "Developer"}`,
    description: profile.headline,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${sora.variable} ${jetbrainsMono.variable} dark`} suppressHydrationWarning>
      <body className="font-sans antialiased min-h-screen flex flex-col bg-surface text-ink-primary selection:bg-accent/30 selection:text-white transition-colors duration-300">
        <ThemeProvider>
          <div className="noise-overlay" aria-hidden />
          <div className="scanlines" aria-hidden />
          <ThemeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
