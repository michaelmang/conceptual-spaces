import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/brand";
import {
  GUIDE_DESCRIPTION,
  GUIDE_SECTIONS,
  GUIDE_TITLE,
  type GuideReading,
} from "@/lib/reading-guide";
import {
  PAPER_AUTHOR,
  PAPER_TITLE,
  PAPER_URL,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

const TITLE = `${GUIDE_TITLE} — ${SITE_NAME}`;

export const metadata: Metadata = {
  title: TITLE,
  description: GUIDE_DESCRIPTION,
  alternates: { canonical: "/guide" },
  openGraph: {
    title: TITLE,
    description: GUIDE_DESCRIPTION,
    url: "/guide",
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: "/og?view=guide", width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: GUIDE_DESCRIPTION,
    images: ["/og?view=guide"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LearningResource",
  name: TITLE,
  url: `${SITE_URL}/guide`,
  description: GUIDE_DESCRIPTION,
  educationalLevel: "advanced",
  learningResourceType: "reading guide",
  author: { "@type": "Person", name: PAPER_AUTHOR },
  about: {
    "@type": "ScholarlyArticle",
    headline: PAPER_TITLE,
    author: { "@type": "Person", name: PAPER_AUTHOR },
    url: PAPER_URL,
  },
};

function ReadingItem({ reading }: { reading: GuideReading }) {
  const heading = (
    <>
      <span className="font-medium text-white/85">{reading.author}</span>
      {", "}
      <span className="italic">{reading.title}</span>
    </>
  );
  return (
    <li className="rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2.5">
      <p className="text-sm leading-snug text-white/70">
        {reading.url ? (
          <a
            href={reading.url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white [&>span]:hover:text-[#7ab8ff]"
          >
            {heading} <span aria-hidden>↗</span>
          </a>
        ) : (
          heading
        )}
      </p>
      {reading.detail && (
        <p className="mt-0.5 text-xs text-white/40">{reading.detail}</p>
      )}
      <p className="mt-1 text-xs leading-relaxed text-white/50">{reading.why}</p>
    </li>
  );
}

export default function GuidePage() {
  return (
    <div className="h-full overflow-y-auto scroll-smooth">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="mx-auto max-w-2xl px-5 py-10 sm:py-14">
        {/* Header */}
        <header>
          <div className="flex gap-2">
            {BRAND.gradientStops.map((color) => (
              <span
                key={color}
                className="h-1 w-8 rounded-full"
                style={{ background: color }}
              />
            ))}
          </div>
          <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.18em] text-white/40">
            Companion reading guide
          </p>
          <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tight text-white">
            Read your way up the tower
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-white/60">
            The 3D model shows the argument; the paper makes it. This guide is
            for working through the specifics — station by station, with the
            paper&apos;s own sources and a few additions, from Aristotle&apos;s{" "}
            <em>De Anima</em> to probing experiments on GPT-2.
          </p>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center">
            <Link
              href="/"
              className="rounded-lg bg-white px-4 py-2.5 text-center text-sm font-semibold text-[#0a0e1a] transition-colors hover:bg-white/90"
            >
              Open the 3D model
            </Link>
            <a
              href={PAPER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              Read the paper ↗
            </a>
          </div>
        </header>

        {/* How to use */}
        <section className="mt-10 rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <h2 className="text-xs font-medium uppercase tracking-wider text-white/40">
            How to use this guide
          </h2>
          <ol className="mt-3 space-y-2 text-sm leading-relaxed text-white/60">
            <li>
              <span className="font-semibold text-white/85">1.</span> Play the
              2-minute story in the 3D model to get the shape of the argument.
            </li>
            <li>
              <span className="font-semibold text-white/85">2.</span> Read the
              paper (§I–IV) — each part below tells you which section it
              unpacks.
            </li>
            <li>
              <span className="font-semibold text-white/85">3.</span> Work the
              stations that grab you. <em>Read first</em>{" "}
              is the paper&apos;s own sources; <em>go deeper</em>{" "}
              adds context around them.
            </li>
          </ol>
        </section>

        {/* Contents */}
        <nav className="mt-10" aria-label="Guide contents">
          <h2 className="text-xs font-medium uppercase tracking-wider text-white/40">
            The eleven parts
          </h2>
          <ol className="mt-3 space-y-1">
            {GUIDE_SECTIONS.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="group flex items-baseline gap-2 rounded-lg px-3 py-1.5 transition-colors hover:bg-white/5"
                >
                  <span
                    className="text-xs tabular-nums"
                    style={{ color: section.color }}
                  >
                    {section.part}.
                  </span>
                  <span className="text-sm text-white/75 transition-colors group-hover:text-white">
                    {section.title}
                  </span>
                  <span className="ml-auto shrink-0 text-[11px] text-white/30">
                    {section.paperRef}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Sections */}
        {GUIDE_SECTIONS.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="mt-14 scroll-mt-10"
          >
            <p
              className="text-[11px] font-medium uppercase tracking-[0.16em]"
              style={{ color: section.color }}
            >
              Part {section.part} · {section.paperRef}
            </p>
            <h2 className="mt-1.5 text-xl font-bold tracking-tight text-white">
              {section.title}
            </h2>
            {section.body.map((paragraph) => (
              <p
                key={paragraph.slice(0, 32)}
                className="mt-3 text-[15px] leading-relaxed text-white/60"
              >
                {paragraph}
              </p>
            ))}
            <Link
              href={section.appHref}
              className="mt-3 inline-block text-sm font-medium text-[#4a9eff] transition-colors hover:text-[#7ab8ff]"
            >
              {section.appLabel} →
            </Link>

            <div className="mt-5 space-y-4">
              <div>
                <h3 className="text-xs font-medium uppercase tracking-wider text-white/40">
                  Read first
                </h3>
                <ul className="mt-2 space-y-2">
                  {section.readFirst.map((reading) => (
                    <ReadingItem key={reading.title} reading={reading} />
                  ))}
                </ul>
              </div>
              {section.goDeeper.length > 0 && (
                <div>
                  <h3 className="text-xs font-medium uppercase tracking-wider text-white/40">
                    Go deeper
                  </h3>
                  <ul className="mt-2 space-y-2">
                    {section.goDeeper.map((reading) => (
                      <ReadingItem key={reading.title} reading={reading} />
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        ))}

        {/* Footer */}
        <footer className="mt-16 border-t border-white/10 pt-5 pb-8">
          <p className="text-sm leading-relaxed text-white/50">
            Reading guide for{" "}
            <a
              href={PAPER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#4a9eff] transition-colors hover:text-[#7ab8ff]"
            >
              {PAPER_TITLE}
            </a>{" "}
            by {PAPER_AUTHOR}. Corrections and suggested readings welcome — the
            paper is a working draft.
          </p>
          <p className="mt-3 text-sm">
            <Link
              href="/"
              className="font-medium text-white/70 transition-colors hover:text-white"
            >
              ← Back to the 3D model
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
}
