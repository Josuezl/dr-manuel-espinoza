import { Activity } from "lucide-react";
import { procedures } from "@/data/site";

export default function ClinicalTicker() {
  return (
    <section
      aria-label="Áreas clínicas"
      className="relative z-30 -mt-8 px-3 sm:px-8"
    >
      <div className="clinical-ticker-shell relative mx-auto max-w-[99rem] overflow-hidden rounded-[2rem] border border-white bg-white shadow-[0_24px_70px_-42px_rgba(2,12,39,0.42)]">
        <div
          role="region"
          aria-label="Áreas de atención"
          tabIndex={0}
          className="clinical-ticker-mask overflow-hidden py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cobalt"
        >
          <div className="clinical-ticker-track flex w-max items-center">
            <div role="list" className="flex shrink-0 items-center">
              {procedures.map((item) => (
                <div
                  role="listitem"
                  key={item.name}
                  className="flex shrink-0 items-center gap-4 px-6"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-cobalt-soft text-cobalt">
                    <Activity className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="max-w-64 text-sm font-semibold text-cloud">
                    {item.name}
                  </span>
                  <span
                    className="h-1 w-1 rounded-full bg-cobalt"
                    aria-hidden="true"
                  />
                </div>
              ))}
            </div>

            <div aria-hidden="true" className="flex shrink-0 items-center">
              {procedures.map((item) => (
                <div
                  key={`ticker-copy-${item.name}`}
                  className="flex shrink-0 items-center gap-4 px-6"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-cobalt-soft text-cobalt">
                    <Activity className="h-4 w-4" />
                  </span>
                  <span className="max-w-64 text-sm font-semibold text-cloud">
                    {item.name}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-cobalt" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
