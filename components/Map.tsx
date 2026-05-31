import { MapPin, Clock, ExternalLink } from "lucide-react";
import { doctorData } from "../data/doctor";

export default function Map() {
  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-pearl-grey shadow-xl shadow-primary/5 h-[450px] bg-pearl-grey group">
      
      {/* Google Maps Iframe (Tegucigalpa Placeholder Location) */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m13!1d15478.472718167733!2d-87.20235773177699!3d14.071887019777598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f6fa2c1a851167b%3A0xf69c7cc49d8e75db!2sTegucigalpa%2C%20Honduras!5e0!3m2!1ses!2shn!4v1717000000000!5m2!1ses!2shn"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Ubicación del Consultorio del Dr. Manuel Espinoza"
        className="w-full h-full grayscale-[10%] contrast-[105%]"
      />

      {/* Hover visual tint */}
      <div className="absolute inset-0 bg-primary/5 mix-blend-color pointer-events-none" />

      {/* Floating Address and Hours Panel */}
      <div className="absolute bottom-6 left-6 right-6 md:right-auto md:w-80 bg-white/95 backdrop-blur-md p-6 rounded-2xl border border-pearl-grey shadow-2xl space-y-4">
        
        <div className="flex items-start space-x-3">
          <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
          <div className="text-left">
            <h4 className="text-sm font-bold text-primary font-serif">Consultorio Clínico</h4>
            <p className="text-xs text-primary/75 leading-relaxed mt-1 font-sans">
              {doctorData.address}
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3 border-t border-pearl-grey pt-3">
          <Clock className="h-5 w-5 text-accent shrink-0 mt-0.5" />
          <div className="text-left">
            <h4 className="text-sm font-bold text-primary font-serif">Horario de Atención</h4>
            <p className="text-xs text-primary/75 leading-relaxed mt-1 font-sans">
              Lunes a Viernes: 9:00 AM - 5:00 PM
              <br />
              Sábados: Previa cita programada
            </p>
          </div>
        </div>

        <div className="pt-2">
          <a
            href={doctorData.addressMapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 w-full bg-primary hover:bg-primary-hover text-white text-xs font-semibold py-2.5 rounded-xl transition-colors shadow-sm"
          >
            <span>Ver en Google Maps</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

      </div>

    </div>
  );
}
