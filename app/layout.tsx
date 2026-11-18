import type { Metadata } from "next";
import { Newsreader } from "next/font/google";
import localFont from "next/font/local";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/lib/data/site";
import "./globals.css";

// next/font only knows how to match a serif against Times New Roman, and
// its precomputed size-adjust for that pair (105.48%) overshoots: the
// fallback ran three lines longer on the Pinpoint writeup. The fallback is
// hand-written against Georgia in globals.css instead.
const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-newsreader",
  display: "swap",
  adjustFontFallback: false,
});

// Self-hosted from the upstream release. Google Fonts' build strips the
// stylistic sets and the width axis; this subset keeps both (wdth 75-100,
// wght 400-700, ss01-ss12) in a latin-only woff2.
const instrumentSans = localFont({
  src: "./fonts/instrument-sans-variable.woff2",
  weight: "400 700",
  style: "normal",
  declarations: [{ prop: "font-stretch", value: "75% 100%" }],
  variable: "--font-instrument-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: site.heroLine,
  metadataBase: new URL(`https://${site.domain}`),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${newsreader.variable} ${instrumentSans.variable}`}>
      <body className="min-h-dvh bg-bg text-text">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
