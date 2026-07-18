import Reveal from "./Reveal";
import WordsReveal from "./WordsReveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  inverse?: boolean;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  inverse = false,
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={`${centered ? "mx-auto text-center" : ""} ${className ?? ""}`}
    >
      <Reveal>
        <span
          className={`section-kicker ${
            inverse ? "section-kicker-inverse" : ""
          }`}
        >
          {eyebrow}
        </span>
      </Reveal>
      <WordsReveal
        text={title}
        className={`mt-5 font-display text-[clamp(2.25rem,3vw,3rem)] font-semibold leading-[1.1] tracking-[-0.032em] ${
          inverse ? "text-white" : "text-ink"
        }`}
      />
      {description ? (
        <Reveal delay={0.12}>
          <p
            className={`mt-6 text-lg leading-8 sm:text-[1.1875rem] ${
              centered ? "mx-auto max-w-2xl" : "max-w-xl"
            } ${inverse ? "text-white/90" : "text-cloud"}`}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
