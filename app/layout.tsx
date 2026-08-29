import type { Metadata, Viewport } from "next";
import "@fontsource-variable/archivo/wght.css";
import "@fontsource-variable/fraunces/wght.css";
import "@fontsource-variable/fraunces/wght-italic.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://trama-trans-bcn.local"),
  title: {
    default: "TRAMA TRANS BCN",
    template: "%s · TRAMA TRANS BCN",
  },
  description:
    "Información pública, trazable y revisada para encontrar apoyo en Barcelona.",
  applicationName: "TRAMA TRANS BCN",
  keywords: ["Barcelona", "recursos trans", "LGTBI", "salud", "derechos"],
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: "#10110f",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
