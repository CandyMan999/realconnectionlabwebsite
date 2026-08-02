import "./globals.css";

export const metadata = {
  title: "Real Connection Lab LLC",
  description:
    "Real Connection Lab LLC builds mobile apps for meaningful live connection, accountability, and community.",
  openGraph: {
    title: "Real Connection Lab LLC",
    description:
      "Explore Fanline, Sober Motivation, and Wine&Dime from Real Connection Lab LLC.",
    type: "website"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
