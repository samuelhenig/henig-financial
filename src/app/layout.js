import "./globals.css";

export const metadata = {
  title: "Henig Financial | Family Financial Coaching",
  description: "Calm financial coaching for real family life.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}