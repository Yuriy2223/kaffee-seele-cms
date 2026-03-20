import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const SITE_URL = "https://kavadlyadushi.ua";
const DESCRIPTION =
  "Затишна кав'ярня, де кожна чашка наповнена теплом і натхненням. Справжній смак кави для душі.";
const OG_IMAGE =
  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&h=630";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Кава для душі",
    template: "%s | Кава для душі",
  },
  description: DESCRIPTION,
  keywords: ["кав'ярня", "кофейня", "кава", "Київ", "затишна кав'ярня", "кава для душі"],
  authors: [{ name: "Кава для душі", url: SITE_URL }],
  openGraph: {
    type: "website",
    locale: "uk_UA",
    url: SITE_URL,
    siteName: "Кава для душі",
    title: "Кава для душі",
    description: DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Затишна кав'ярня Кава для душі",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Кава для душі",
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

import { ScrollProgress } from "@/shared/ScrollProgress";
import QueryProvider from "@/components/providers/QueryProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className="scroll-smooth">
      <body className={`${geistSans.variable} antialiased`}>
        <QueryProvider>
          <ScrollProgress />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
