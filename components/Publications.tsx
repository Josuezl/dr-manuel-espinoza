import { publications, doctor } from "@/data/site";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Publications() {
  return (
    <section
      id="publicaciones"
      className="relative overflow-hidden bg-frost pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-20 lg:pt-20"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
          <SectionHeading
            eyebrow="Producción científica"
            title="Publicaciones científicas"
            description="Casos clínicos y técnicas intervencionistas publicados en revistas médicas indexadas."
            className="max-w-4xl"
          />

          <Reveal delay={0.16}>
            <a
              href={doctor.pubmedProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="button-sweep inline-flex min-h-12 items-center justify-center rounded-full bg-navy px-6 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:text-white"
            >
              Ver perfil en PubMed
              <span className="ml-3 text-base" aria-hidden="true">
                ↗
              </span>
            </a>
          </Reveal>
        </div>

        <ol className="mt-14 space-y-4">
          {publications.map((pub, index) => (
            <li key={pub.pmid} className="min-w-0">
              <Reveal delay={Math.min(index * 0.07, 0.24)}>
                <article>
                  <a
                    href={`https://pubmed.ncbi.nlm.nih.gov/${pub.pmid}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${pub.title}. Abrir publicación en PubMed`}
                    className="publication-row group relative grid min-h-[10.5rem] gap-6 overflow-hidden rounded-2xl border border-line bg-white px-6 py-7 text-ink shadow-[0_18px_50px_-38px_rgba(9,36,60,0.24)] motion-safe:transition-[transform,border-color,background-color,box-shadow] motion-safe:duration-300 hover:translate-x-1 hover:border-cobalt/35 hover:bg-[#fbfcff] hover:shadow-[0_24px_60px_-36px_rgba(9,36,60,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt focus-visible:ring-offset-2 focus-visible:ring-offset-frost sm:px-8 min-[900px]:grid-cols-[9rem_minmax(0,1fr)_8.5rem] min-[900px]:items-center min-[900px]:gap-7 min-[900px]:px-9"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-0 left-0 w-[3px] origin-center scale-y-0 bg-cobalt transition-transform duration-500 group-hover:scale-y-100"
                    />

                    <div className="min-w-0 border-b border-line pb-5 min-[900px]:border-b-0 min-[900px]:border-r min-[900px]:pb-0 min-[900px]:pr-7">
                      <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
                        Publicación {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="mt-3 block text-sm font-semibold leading-5 text-cobalt">
                        {pub.journal}
                      </span>
                      <span className="mt-4 block font-mono text-[10px] uppercase leading-5 tracking-[0.14em] text-muted">
                        <span className="text-cobalt">{pub.year}</span>
                        <span className="block">PMID {pub.pmid}</span>
                      </span>
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-display text-xl font-semibold leading-[1.2] tracking-[-0.04em] text-ink sm:text-2xl">
                        {pub.title}
                      </h3>
                      {pub.note ? (
                        <p className="mt-4 max-w-3xl text-lg leading-7 text-cloud">
                          <span className="mr-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-cobalt">
                            Enfoque
                          </span>
                          {pub.note}
                        </p>
                      ) : null}
                    </div>

                    <span className="inline-flex min-h-11 w-fit items-center gap-3 rounded-full border border-line px-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-navy transition-[border-color,color] duration-300 group-hover:border-cobalt group-hover:text-cobalt min-[900px]:justify-self-end">
                      Leer en PubMed
                      <span
                        className="text-base transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                        aria-hidden="true"
                      >
                        ↗
                      </span>
                    </span>
                  </a>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal delay={0.12}>
          <p className="mt-12 border-t border-line pt-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
            Fuente: PubMed · Biblioteca Nacional de Medicina de EE. UU.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
