import { supabase } from "../lib/supabaseClient";
import type { SiteExecutive, SiteExecutiveUpdate } from "../types/SiteExecutives";

const TABLE = "site_executives";
const BUCKET = "site-executives";

// ── Image helpers ─────────────────────────────────────────────────────────

export const uploadSiteExecutiveImage = async (file: File): Promise<string> => {
  const fileName = `${Date.now()}_${file.name}`;
  const { error } = await supabase.storage.from(BUCKET).upload(fileName, file, {
    upsert: true,
  });
  if (error) throw error;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(fileName);
  return data?.publicUrl || "";
};

const getPathFromPublicUrl = (url: string): string | null => {
  const marker = `/object/public/${BUCKET}/`;
  const idx = url.indexOf(marker);
  if (idx === -1) return null;
  return url.substring(idx + marker.length);
};

const deleteSiteExecutiveImage = async (imageUrl: string | null) => {
  if (!imageUrl) return;
  // Don't try to delete public-folder images (legacy /president.JPG etc.)
  if (!imageUrl.startsWith("http")) return;
  const path = getPathFromPublicUrl(imageUrl);
  if (!path) return;
  const { error } = await supabase.storage.from(BUCKET).remove([path]);
  if (error) console.error("Error deleting image:", error);
};

// ── CRUD ─────────────────────────────────────────────────────────────────

export const fetchSiteExecutives = async (): Promise<SiteExecutive[]> => {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("id", { ascending: true });

  if (error) throw error;
  return (data as SiteExecutive[]) || [];
};

export const updateSiteExecutive = async (
  id: number,
  payload: SiteExecutiveUpdate,
  previousImage: string | null
): Promise<void> => {
  // Delete old stored image only if the image is actually changing to a new one
  if (previousImage && payload.image && previousImage !== payload.image) {
    await deleteSiteExecutiveImage(previousImage);
  }

  const { error } = await supabase
    .from(TABLE)
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) throw error;
};
