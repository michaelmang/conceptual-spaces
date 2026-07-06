import type { Metadata } from "next";
import { HomeClient } from "./HomeClient";
import { FACULTIES, LAYER_ZONES } from "@/lib/cognitive-model";
import { serializeFocus } from "@/lib/camera-focus";
import { STORY_STEPS } from "@/lib/story";
import {
  describeParams,
  HOOK,
  PAPER_AUTHOR,
  PAPER_TITLE,
  PAPER_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const view = describeParams(await searchParams);

  const og = new URLSearchParams();
  if (view.stepIndex !== null) {
    og.set("step", String(view.stepIndex + 1));
  } else if (view.focus.kind !== "overview") {
    og.set("focus", serializeFocus(view.focus));
  }
  const image = og.size > 0 ? `/og?${og}` : "/og";

  return {
    title: view.title,
    description: view.description,
    alternates: { canonical: "/" },
    openGraph: {
      title: view.title,
      description: view.description,
      url: "/",
      siteName: SITE_NAME,
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: view.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: view.title,
      description: view.description,
      images: [image],
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web browser",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      author: { "@type": "Person", name: PAPER_AUTHOR },
      about: { "@id": `${SITE_URL}/#paper` },
    },
    {
      "@type": "ScholarlyArticle",
      "@id": `${SITE_URL}/#paper`,
      headline: PAPER_TITLE,
      author: { "@type": "Person", name: PAPER_AUTHOR },
      url: PAPER_URL,
      datePublished: "2026-06-05",
      abstract:
        "Peter Gärdenfors' conceptual spaces framework proposes a geometric model of cognition. This paper argues that Gärdenfors has independently recovered the cognitive structure of Aristotle, grounds the framework ontologically in the Aristotelian-Thomistic hierarchy, and draws implications for LLM architecture.",
      keywords:
        "conceptual spaces, Gärdenfors, Aristotle, Aquinas, cogitative power, cognitive science, philosophy of AI, LLM",
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      {/* Crawlable summary of an otherwise WebGL-only page (also the screen-reader path) */}
      <section className="sr-only">
        <h1>Conceptual Spaces — an interactive 3D map of the mind</h1>
        <p>{HOOK}</p>
        <p>
          Peter Gärdenfors&apos; conceptual spaces framework models concepts as
          geometry: quality dimensions form domains, concepts are convex regions,
          typicality is distance from a prototype. This visualization places that
          framework in the middle of the Aristotelian-Thomistic cognitive
          hierarchy — formal reception through the senses below it, the
          immaterial intellect above it — showing how the classical psychology
          fills the two gaps the modern framework leaves open. It is the
          interactive companion to the paper{" "}
          <a href={PAPER_URL}>
            {PAPER_TITLE} by {PAPER_AUTHOR}
          </a>
          . A station-by-station <a href="/guide">reading guide with sources</a>{" "}
          accompanies both.
        </p>
        <h2>The three layers</h2>
        <ul>
          {Object.values(LAYER_ZONES).map((zone) => (
            <li key={zone.label}>
              {zone.label}: {zone.summary}
            </li>
          ))}
        </ul>
        <h2>The eight stations</h2>
        <ul>
          {FACULTIES.map((f) => (
            <li key={f.id}>
              {f.label} ({f.subtitle}): {f.description}
            </li>
          ))}
        </ul>
        <h2>The story</h2>
        <ol>
          {STORY_STEPS.map((s) => (
            <li key={s.title}>
              {s.title}: {s.narration}
            </li>
          ))}
        </ol>
      </section>
      <HomeClient />
    </>
  );
}
