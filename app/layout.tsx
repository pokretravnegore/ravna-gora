import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { getLocale } from "next-intl/server";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

const CANONICAL_URL = "https://ravnagorachetniks.org";
// On Vercel, VERCEL_URL is the deployment hostname (no protocol). Use it so that
// relative image paths resolve to a publicly reachable URL on every deployment.
const SITE_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : CANONICAL_URL;
const SITE_NAME = "Ravna Gora";
const TITLE = "The Movement of Serbian Chetniks Ravne Gore";
const DESCRIPTION =
  "Official website of the Movement of Serbian Chetniks Ravne Gore — USA Chapter. Preserving the Ravna Gora ideals and the legacy of those who fought for the Serbian people.";

export const metadata: Metadata = {
  title: {
    default: TITLE,
    template: `%s — ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL_URL,
    locale: "en_US",
    images: [{ url: "/opengraph.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/twitter.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  return (
    <html
      lang={locale}
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
e