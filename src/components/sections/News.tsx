import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import AppDownloadModal from "../ui/AppDownloadModal";

interface FeedItem {
  id: number;
  title: string;
  description: string;
  image: string | null;
  created_at: string;
  type: "article" | "event";
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function truncate(text: string, maxLen: number) {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen).trimEnd() + "…";
}

const News = () => {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<FeedItem | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const { data, error } = await supabase
          .from("articles")
          .select("id, title, description, image, created_at, type")
          .eq("type", "article")
          .order("created_at", { ascending: false })
          .limit(3);

        if (!error && data) setItems(data as FeedItem[]);
      } catch (err) {
        console.error("Failed to fetch news:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // Skeleton cards while loading
  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="flex justify-between items-end mb-12">
            <div>
              <div className="h-3 w-24 bg-gray-200 rounded mb-3 animate-pulse" />
              <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <div className="aspect-[4/3] bg-gray-100 rounded-2xl animate-pulse" />
                <div className="h-3 w-20 bg-gray-100 rounded animate-pulse" />
                <div className="h-5 w-full bg-gray-100 rounded animate-pulse" />
                <div className="h-5 w-3/4 bg-gray-100 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Empty state — section still renders so it's always visible on the page
  if (items.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="mb-12">
            <h4 className="text-primary font-bold tracking-wider uppercase text-sm mb-3">
              Latest Updates
            </h4>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
              News &amp; Updates
            </h2>
          </div>
          <div className="flex flex-col items-center justify-center py-16 border border-dashed border-gray-200 rounded-3xl text-center bg-gray-50">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-primary/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2" />
              </svg>
            </div>
            <p className="text-text-muted text-sm">No articles published yet. Check back soon.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="flex justify-between items-end mb-12">
            <div className="max-w-2xl">
              <h4 className="text-primary font-bold tracking-wider uppercase text-sm mb-3">
                Latest Updates
              </h4>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
                News &amp; Updates
              </h2>
            </div>
            <p className="hidden md:block text-sm text-text-muted italic">
              Tap a story to read more on the app
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelected(item)}
                className="group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl"
              >
                {/* Image */}
                <div className="relative overflow-hidden rounded-2xl mb-5 aspect-[4/3] bg-gray-100">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                      <svg className="w-12 h-12 text-primary/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2" />
                      </svg>
                    </div>
                  )}
                  {/* Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-primary uppercase tracking-wide">
                    College News
                  </div>
                </div>

                {/* Meta */}
                <div className="space-y-2">
                  <div className="text-sm text-text-muted flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                    {formatDate(item.created_at)}
                  </div>
                  <h3 className="text-lg font-bold text-text-primary group-hover:text-primary transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {truncate(item.description, 110)}
                  </p>
                  <div className="flex items-center gap-1 text-sm font-semibold text-primary pt-1">
                    Read on App
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* App download modal */}
      {selected && (
        <AppDownloadModal
          articleTitle={selected.title}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
};

export default News;
