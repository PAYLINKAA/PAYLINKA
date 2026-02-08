import type { Metadata } from "next";
import { Web3Provider } from "@/lib/web3-provider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Paylinka — Turn links into on-chain payments",
  description:
    "Create programmable crypto payment links that work across wallets, QR codes, NFC, and apps — no checkout UI required.",
  openGraph: {
    title: "Paylinka — Turn links into on-chain payments",
    description:
      "Create programmable crypto payment links that work across wallets, QR codes, NFC, and apps.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Paylinka — Turn links into on-chain payments",
    description:
      "Create programmable crypto payment links that work across wallets, QR codes, NFC, and apps.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script src="https://cdn.tailwindcss.com"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                theme: {
                  extend: {
                    colors: {
                      paylinka: {
                        50: "#f0f4ff", 100: "#dbe4ff", 200: "#bac8ff",
                        300: "#91a7ff", 400: "#748ffc", 500: "#5c7cfa",
                        600: "#4c6ef5", 700: "#4263eb", 800: "#3b5bdb",
                        900: "#364fc7", 950: "#1e3a8a",
                      },
                      dark: {
                        50: "#f8fafc", 100: "#f1f5f9", 200: "#e2e8f0",
                        300: "#cbd5e1", 400: "#94a3b8", 500: "#64748b",
                        600: "#475569", 700: "#334155", 800: "#1e293b",
                        900: "#0f172a", 950: "#020617",
                      },
                    },
                  },
                },
              }
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-dark-950 text-dark-50 antialiased">
        <Web3Provider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Web3Provider>
      </body>
    </html>
  );
}
