import type { Metadata } from "next";
import "../src/App.css";
import "../src/index.css";
import ShopellaLayout from "@/layouts/next/ShopellaLayout";
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
      <body>
        <Providers>
          <ShopellaLayout>{children}</ShopellaLayout>
        </Providers>
      </body>
    </html>
  );
}
