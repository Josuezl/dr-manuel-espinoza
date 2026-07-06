import { publications, doctor } from "@/data/site";
import Chapter from "./Chapter";
import WordsReveal from "./WordsReveal";
import Reveal from "./Reveal";

export default function Publications() {
  return (
    <section id="publicaciones" className="relative bg-abyss py-28 sm:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <Chapter index="05" title="Evidencia" />

        <div className="mt-10 flex flex-wrap items-end justify-between gap-8">
          <WordsReveal
            text="Ciencia publicada, práctica respaldada."
            accent={["Ciencia", "publicada"]}
            className="max-w-3xl font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-7xl"
          />
          <Reveal delay={0.15}>
            <a
              href={doctor.pubmedProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border-b border-line pb-2 font-mono text-xs uppercase tracking-[0.25em] text-paper transition-colors hover:border-teal hover:text-teal"
            >
              Perfil en PubMed ↗
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <ol className="mt-20 border-t border-line">
            {publications.map((pub) => (
              <li key={pub.pmid} className="border-b border-line">
                <a
                  href={`https://pubmed.ncbi.nlm.nih.gov/${pub.pmid}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid gap-3 py-8 sm:grid-cols-[7rem_1fr_auto] sm:gap-10 sm:py-9"
                >
                  <div className="font-mono text-[11px] uppercase leading-loose tracking-[0.2em] text-muted">
                    <span className="block text-pulse">{pub.year}</span>
                    <span className="block">PMID {pub.pmid}</span>
                  </div>
                  <div>
                    <h3 className="max-w-3xl font-display text-xl font-semibold leading-snug tracking-tight text-cloud transition-colors duration-300 group-hover:text-paper sm:text-2xl">
                      {pub.title}
                    </h3>
                    <p className="mt-3 text-sm text-muted">
                      <span className="italic">{pub.journal}</span>
                      {pub.note ? <> — {pub.note}</> : null}
                    </p>
                  </div>
                  <span
                    className="hidden self-center font-display text-2xl text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-teal sm:block"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            Fuente: PubMed · Biblioteca Nacional de Medicina de EE. UU.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
