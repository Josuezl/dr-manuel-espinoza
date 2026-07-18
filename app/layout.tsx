import type { Metadata, Viewport } from "next";
import { Libre_Franklin, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { doctor } from "@/data/site";

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
  title: `${doctor.shortName} | Cardiología Intervencionista · San Pedro Sula`,
  description:
    "Cardiólogo intervencionista y de cardiopatía estructural en San Pedro Sula, Honduras. Líder del primer procedimiento MyClip (reparación mitral percutánea) del país. Agenda tu cita en línea.",
  keywords: [
    "Dr. Manuel Espinoza",
    "Cardiólogo San Pedro Sula",
    "Cardiología Intervencionista Honduras",
    "MyClip Honduras",
    "TAVI Honduras",
    "Insuficiencia mitral",
    "Angioplastia coronaria",
    "Hospital del Valle",
  ],
  authors: [{ name: doctor.name }],
  openGraph: {
    title: `${doctor.shortName} | Cardiología Intervencionista`,
    description:
      "Líder del primer MyClip realizado en Honduras. Procedimientos cardíacos mínimamente invasivos en San Pedro Sula.",
    siteName: doctor.shortName,
    locale: "es_HN",
    type: "website",
    images: [{ url: doctor.photo }],
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
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
