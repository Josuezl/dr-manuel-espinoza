import type { Metadata, Viewport } from "next";
import { Libre_Franklin, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { doctor } from "@/data/site";
import { getRoute } from "@/data/routes";
import JsonLd from "@/components/JsonLd";
import { physicianSchema } from "@/lib/schema";

// title y description del home se derivan de data/routes.ts en vez de
// repetirse a mano: es la misma fuente que ya usa pageMetadata() para las
// 7 paginas de contenido, asi que si alguien edita routes.ts el home no
// puede quedar con metadata vieja en silencio.
const homeRoute = getRoute("/");

const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-libre-franklin",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-source-sans-3",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://drmanuelespinoza.com"),
  title: homeRoute.title,
  description: homeRoute.description,
  alternates: {
    canonical: "/",
  },
  authors: [{ name: doctor.name }],
  openGraph: {
    title: "Cardiólogo Intervencionista en San Pedro Sula | Dr. Manuel Espinoza",
    description:
      "Líder del primer MyClip realizado en Honduras. Procedimientos cardíacos mínimamente invasivos en San Pedro Sula.",
    siteName: doctor.shortName,
    locale: "es_HN",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#4b62d9",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${libreFranklin.variable} ${sourceSans.variable}`}>
      <body className="min-h-screen antialiased">
        <JsonLd data={physicianSchema()} />
        {children}
      </body>
    </html>
  );
}
