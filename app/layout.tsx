import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Figtree, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { doctor } from "@/data/site";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex",
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
  themeColor: "#06121d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${bricolage.variable} ${figtree.variable} ${plexMono.variable}`}
    >
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
