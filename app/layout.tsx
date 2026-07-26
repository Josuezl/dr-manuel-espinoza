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
  metadataBase: new URL("https://drmanuelespinoza.com"),
  title: "Cardiólogo Intervencionista en San Pedro Sula | Dr. Manuel Espinoza",
  description:
    "Dr. Manuel Espinoza, cardiólogo intervencionista y especialista en hemodinamia en San Pedro Sula, Honduras. Cateterismo, angioplastia, TAVI y cardiopatía estructural. Agenda tu cita.",
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
    title: "Cardiólogo Intervencionista en San Pedro Sula | Dr. Manuel Espinoza",
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Physician", "MedicalBusiness"],
    "@id": "https://drmanuelespinoza.com/#physician",
    name: "Dr. Manuel Espinoza Rueda - Cardiólogo Intervencionista",
    alternateName: "Dr. Manuel Espinoza",
    url: "https://drmanuelespinoza.com",
    image: "https://drmanuelespinoza.com/img/dr-manuel-espinoza.jpg",
    medicalSpecialty: ["Cardiovascular", "InterventionalCardiology"],
    description:
      "Dr. Manuel Espinoza, cardiólogo intervencionista y especialista en hemodinamia en San Pedro Sula, Honduras. Cateterismo, angioplastia, TAVI y cardiopatía estructural.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "San Pedro Sula",
      addressRegion: "Cortés",
      addressCountry: "HN",
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "San Pedro Sula, Honduras",
    },
  };

  return (
    <html lang="es" className={`${libreFranklin.variable} ${sourceSans.variable}`}>
      <body className="min-h-screen antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
