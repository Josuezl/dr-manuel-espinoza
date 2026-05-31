import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { doctorData } from "@/data/doctor";

export const metadata: Metadata = {
  title: `${doctorData.name} | ${doctorData.title}`,
  description: "Cardiólogo intervencionista y experto en terapia valvular estructural (TAVI). Tratamiento de enfermedad coronaria compleja en Tegucigalpa, Honduras. Más de 15 años de experiencia salvando vidas.",
  keywords: [
    "Dr. Manuel Espinoza",
    "Cardiólogo Intervencionista",
    "Cardiología Honduras",
    "TAVI Honduras",
    "Estenosis Aórtica Tegucigalpa",
    "Angioplastia Coronaria",
    "MitraClip",
    "Ultrasonido Intracoronario IVUS",
    "Hemodinamia",
    "Cleveland Clinic Fellow"
  ],
  authors: [{ name: doctorData.name }],
  creator: doctorData.name,
  publisher: doctorData.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: `${doctorData.name} | Cardiología Intervencionista de Precisión`,
    description: "Líder en Honduras en terapias valvulares por catéter y angioplastia coronaria compleja. Formación en centros internacionales de prestigio.",
    url: "https://www.dr-manuelespinoza.com",
    siteName: `Consultorio del ${doctorData.name}`,
    locale: "es_HN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0B2A40",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="min-h-screen bg-cold-white text-primary flex flex-col antialiased">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
