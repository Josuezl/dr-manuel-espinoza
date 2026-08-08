import Link from "next/link";

/**
 * Ruta de navegación compartida por todas las páginas de contenido. Vive
 * aparte de ContentPage.tsx porque /contacto no tiene "secciones" y no
 * puede pasar por PageContent, pero sí necesita el mismo breadcrumb --
 * copiarlo a mano en cada lugar es lo que este componente evita.
 */
export default function Breadcrumb({ current }: { current: string }) {
  return (
    <nav aria-label="Ruta de navegación" className="text-xs text-cloud">
      <ol className="flex list-none items-center gap-1.5">
        <li>
          <Link href="/" className="hover:text-cobalt">
            Inicio
          </Link>
        </li>
        <li aria-hidden="true">·</li>
        <li aria-current="page">{current}</li>
      </ol>
    </nav>
  );
}
