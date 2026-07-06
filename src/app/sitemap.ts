import type { MetadataRoute } from "next";
import { FACULTIES, LAYER_ZONES } from "@/lib/cognitive-model";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: SITE_URL, lastModified, changeFrequency: "weekly", priority: 1 },
    ...Object.keys(LAYER_ZONES).map((id) => ({
      url: `${SITE_URL}/?focus=layer:${id}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...FACULTIES.map((f) => ({
      url: `${SITE_URL}/?focus=faculty:${f.id}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
