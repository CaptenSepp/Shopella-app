import type { Metadata } from "next";
import "../src/App.css";
import "../src/index.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Shopella",
  description: "Shopella online store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body><Providers>{children}</Providers></body>
    </html>
  );
}
