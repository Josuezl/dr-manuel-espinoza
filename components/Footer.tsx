import Link from "next/link";
import { HeartPulse, Mail, Phone, MapPin, ShieldAlert } from "lucide-react";
import { doctorData } from "../data/doctor";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Column 1: Logo and Slogan */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-secondary p-2 rounded-full text-white">
                <HeartPulse className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold font-serif tracking-wide text-white">
                Dr. Manuel Espinoza
              </span>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed">
              &quot;{doctorData.concept}&quot;
            </p>
            <p className="text-white/60 text-xs">
              Cardiólogo intervencionista de precisión y experto en terapias valvulares avanzadas (TAVI).
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-accent font-serif font-semibold text-base tracking-wider uppercase">
              Navegación
            </h3>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li>
                <Link href="/" className="hover:text-accent transition-colors">Inicio</Link>
              </li>
              <li>
                <Link href="/sobre-el-doctor" className="hover:text-accent transition-colors">Sobre el Doctor</Link>
              </li>
              <li>
                <Link href="/areas-clinicas" className="hover:text-accent transition-colors">Áreas Clínicas</Link>
              </li>
              <li>
                <Link href="/casos-clinicos" className="hover:text-accent transition-colors">Casos Clínicos</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-accent transition-colors">Blog & Artículos</Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-accent transition-colors">Contacto</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-4">
            <h3 className="text-accent font-serif font-semibold text-base tracking-wider uppercase">
              Ubicación y Contacto
            </h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                <span>{doctorData.address}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-secondary shrink-0" />
                <a href={`tel:${doctorData.phone}`} className="hover:text-accent transition-colors">
                  {doctorData.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-secondary shrink-0" />
                <a href={`mailto:${doctorData.email}`} className="hover:text-accent transition-colors">
                  {doctorData.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Certifications & Social Links */}
          <div className="space-y-4">
            <h3 className="text-accent font-serif font-semibold text-base tracking-wider uppercase">
              Conexión Médica
            </h3>
            <p className="text-sm text-white/70">
              Siga publicaciones científicas, opiniones profesionales e innovación en cardiología estructural.
            </p>
            <div className="flex space-x-4">
              {doctorData.socials.linkedin && (
                <a
                  href={doctorData.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/5 hover:bg-accent hover:text-primary p-2.5 rounded-full transition-all duration-300 flex items-center justify-center"
                  aria-label="LinkedIn"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.43c-1.14 0-2.06-.92-2.06-2.06 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.92 2.06 2.06 0 1.14-.92 2.06-2.06 2.06zm15.11 13.02h-3.56v-5.6c0-1.34-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.7H9.33V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29z"/>
                  </svg>
                </a>
              )}
              {doctorData.socials.youtube && (
                <a
                  href={doctorData.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/5 hover:bg-accent hover:text-primary p-2.5 rounded-full transition-all duration-300 flex items-center justify-center"
                  aria-label="YouTube"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.498 6.163c-.272-1.016-1.07-1.815-2.085-2.087C19.578 3.5 12 3.5 12 3.5s-7.578 0-9.413.576C1.572 4.348.774 5.147.502 6.163.02 8.01.02 12 .02 12s0 3.99.482 5.837c.272 1.016 1.07 1.815 2.085 2.087C4.422 20.5 12 20.5 12 20.5s7.578 0 9.413-.576c1.015-.272 1.813-1.07 2.085-2.087.482-1.847.482-5.837.482-5.837s0-3.99-.482-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              )}
            </div>
            <div className="pt-2">
              <span className="text-[10px] text-white/40 block">
                FMC Honduras Reg. Nº 2008-0421
              </span>
            </div>
          </div>

        </div>

        {/* Disclaimer and Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-2 text-[11px] text-white/50 max-w-xl">
            <ShieldAlert className="h-5 w-5 text-accent shrink-0" />
            <p>
              <strong>Aviso Médico Importante:</strong> El contenido provisto en este sitio web tiene únicamente fines informativos y educativos, y no sustituye de ninguna manera la consulta médica presencial, diagnóstico ni tratamiento profesional personalizado.
            </p>
          </div>
          
          <div className="text-[11px] text-white/50 text-right shrink-0">
            <p>© {currentYear} Dr. Manuel Espinoza. Todos los derechos reservados.</p>
            <p className="mt-0.5 text-accent/50">Cardiología Estructural Avanzada Tegucigalpa</p>
          </div>
        </div>

      </div>
    </footer>
  );
}
