import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://www.henigfinancial.com"),

  title: {
    default: "Henig Financial | Family Financial Coaching",
    template: "%s | Henig Financial",
  },

  description:
    "Henig Financial helps families bring clarity, structure, and calm back into their finances through practical coaching and real-life guidance.",

  applicationName: "Henig Financial",

  alternates: {
    canonical: "https://www.henigfinancial.com",
  },

  openGraph: {
    title: "Henig Financial | Family Financial Coaching",
    description:
      "Practical family financial coaching to help families gain clarity, structure, and calm.",
    url: "https://www.henigfinancial.com",
    siteName: "Henig Financial",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Henig Financial | Family Financial Coaching",
    description:
      "Practical family financial coaching to help families gain clarity, structure, and calm.",
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
