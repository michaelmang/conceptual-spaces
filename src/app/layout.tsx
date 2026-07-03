import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Cognitive Architecture — Conceptual Spaces Visualization",
  description:
    "Interactive 3D visualization of Aristotelian-Thomistic faculty psychology unified with Gärdenfors' conceptual spaces framework",
  openGraph: {
    title: "Conceptual Spaces",
    description:
      "Interactive 3D visualization of Aristotelian-Thomistic faculty psychology unified with Gärdenfors' conceptual spaces framework",
    type: "website",
    siteName: "Conceptual Spaces",
  },
  twitter: {
    card: "summary_large_image",
    title: "Conceptual Spaces",
    description:
      "Interactive 3D visualization of cognitive architecture and conceptual spaces",
  },
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
      </body>
    </html>
  );
}
