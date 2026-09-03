import "./globals.css";
import { apps, company } from "./data/apps";

const siteDescription =
  "Explore FanLine, Sober Motivation, and Myxer from Real Connection Lab LLC: mobile apps for creator calls, sobriety support, and live video speed dating.";

export const metadata = {
  metadataBase: new URL(company.url),
  applicationName: company.name,
  title: {
    default: "Real Connection Lab LLC | Mobile Apps for Real Connection",
    template: `%s | ${company.name}`,
  },
  description: siteDescription,
  keywords: [
    "Real Connection Lab LLC",
    "Real Connection Lab",
    "FanLine",
    "Sober Motivation",
    "Myxer",
    "creator calls",
    "quit drinking app",
    "sobriety tracker",
    "video speed dating",
    "mobile app development",
  ],
  authors: [{ name: company.name, url: company.url }],
  creator: company.name,
  publisher: company.name,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/assets/realConnectionLabLogo.png",
    apple: "/assets/realConnectionLabLogo.png",
  },
  openGraph: {
    title: "Real Connection Lab LLC | Mobile Apps for Real Connection",
    description: siteDescription,
    url: "/",
    siteName: company.name,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: apps[1].ogImage,
        alt: "Sober Motivation app screen from Real Connection Lab LLC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Real Connection Lab LLC | Mobile Apps for Real Connection",
    description: siteDescription,
    images: [apps[1].ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
