import Reveal from "./Reveal";

interface ChapterProps {
  index: string;
  title: string;
}

/** Marcador de capítulo: numeración del recorrido + línea de horizonte. */
export default function Chapter({ index, title }: ChapterProps) {
  return (
    <Reveal>
      <div className="flex items-center gap-5">
        <span className="font-mono text-xs tracking-[0.3em] text-pulse">
          {index}
        </span>
        <span className="h-px flex-1 bg-line" aria-hidden="true" />
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-cloud">
          {title}
        </span>
      </div>
    </Reveal>
  );
}
