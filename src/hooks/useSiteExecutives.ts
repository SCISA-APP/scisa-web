import { useState, useEffect } from "react";
import { fetchSiteExecutives } from "../api/siteExecutives";
import type { SiteExecutive } from "../types/SiteExecutives";

// Fallback public-folder images keyed by position (used when DB has no image yet)
const FALLBACK_IMAGES: Record<string, string> = {
  "President": "/president.JPG",
  "Vice President": "/vp.jpeg",
  "General Secretary": "/gensec.JPG",
  "Financial Secretary": "/finance.JPG",
  "Organizing Secretary": "/organa.JPG",
  "Women's Commissioner": "/wocom.JPG",
};

export interface ExecutiveDisplay {
  id: number;
  position: string;
  name: string;
  image: string;
}

export function useSiteExecutives() {
  const [executives, setExecutives] = useState<ExecutiveDisplay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSiteExecutives()
      .then((data: SiteExecutive[]) => {
        setExecutives(
          data.map((e) => ({
            id: e.id,
            position: e.position,
            name: e.name ?? "",
            image: e.image || FALLBACK_IMAGES[e.position] || "",
          }))
        );
      })
      .catch(() => {
        // On error fall back to static data so the page still renders
        setExecutives(
          Object.entries(FALLBACK_IMAGES).map(([position, image], i) => ({
            id: i + 1,
            position,
            name: "",
            image,
          }))
        );
      })
      .finally(() => setLoading(false));
  }, []);

  return { executives, loading };
}
