import { doctorData } from "../data/doctor";

export default function WhatsAppButton() {
  return (
    <a
      href={doctorData.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 group cursor-pointer"
      aria-label="Contactar por WhatsApp"
    >
      {/* Pulse effect */}
      <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75 animate-ping -z-10 group-hover:opacity-100"></span>

      {/* WhatsApp SVG Icon */}
      <svg
        className="h-7 w-7 fill-current"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.803-4.381 9.805-9.764.001-2.607-1.012-5.059-2.854-6.902C16.38 2.097 13.935.802 11.332.802 5.928.802 1.53 5.185 1.528 10.568c0 1.503.41 2.973 1.187 4.264l-.99 3.612 3.704-.972zm11.585-6.04c-.31-.155-1.83-.903-2.112-1.004-.282-.102-.489-.153-.692.155-.205.307-.791.995-.97 1.2-.178.205-.357.23-.667.076-.31-.155-1.312-.483-2.498-1.542-.924-.825-1.548-1.844-1.73-2.152-.18-.31-.02-.477.136-.631.139-.139.31-.362.465-.544.155-.18.206-.31.31-.515.102-.206.05-.386-.025-.542-.077-.155-.692-1.67-.949-2.285-.25-.6-.524-.518-.72-.528-.18-.01-.387-.01-.594-.01-.206 0-.542.077-.825.387-.283.309-1.082 1.056-1.082 2.576 0 1.52 1.107 2.99 1.26 3.195.155.206 2.178 3.325 5.276 4.662.737.318 1.312.507 1.76.65.742.235 1.417.201 1.95.122.593-.087 1.83-.748 2.087-1.47.258-.72.258-1.338.18-1.47-.076-.131-.282-.207-.593-.362z" />
      </svg>

      {/* Hover Tooltip */}
      <span className="absolute right-16 bg-primary text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 translate-x-2 transition-all duration-300 whitespace-nowrap">
        Agendar Consulta
      </span>
    </a>
  );
}
