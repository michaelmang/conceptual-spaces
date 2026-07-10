import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import {
  PAPER_AUTHOR,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: PAPER_AUTHOR, url: "https://michaelmangialardi.substack.com" }],
  creator: PAPER_AUTHOR,
  keywords: [
    "conceptual spaces",
    "Gärdenfors",
    "Aristotle",
    "Aquinas",
    "cognitive science",
    "cogitative power",
    "philosophy of mind",
    "philosophy of AI",
    "3D visualization",
    "faculty psychology",
  ],
  category: "science",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-full overflow-hidden bg-[#0a0e1a] font-sans text-white">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
