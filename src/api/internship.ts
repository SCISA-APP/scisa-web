import { supabase } from "../lib/supabaseClient";
import type { Listing, ListingInsert } from "../types/Internship";

const BUCKET = "internship-logos";

// ── Image helpers ─────────────────────────────────────────────────────────

export const uploadListingLogo = async (file: File): Promise<string> => {
  const fileName = `${Date.now()}_${file.name}`;
  const { error } = await supabase.storage.from(BUCKET).upload(fileName, file);
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

const deleteListingLogo = async (logoUrl: string | null | undefined) => {
  if (!logoUrl) return;
  const path = getPathFromPublicUrl(logoUrl);
  if (!path) return;
  const { error } = await supabase.storage.from(BUCKET).remove([path]);
  if (error) console.error("Error deleting logo:", error);
};

// ── CRUD ─────────────────────────────────────────────────────────────────

export const fetchListings = async (): Promise<Listing[]> => {
  const { data, error } = await supabase
    .from("internship_listings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as Listing[]) || [];
};

export const addListing = async (payload: ListingInsert): Promise<void> => {
  const { error } = await supabase.from("internship_listings").insert([payload]);
  if (error) throw error;
};

export const updateListing = async (
  id: string,
  payload: ListingInsert,
  previousLogo?: string | null
): Promise<void> => {
  if (previousLogo && previousLogo !== payload.logo) {
    await deleteListingLogo(previousLogo);
  }

  const { error } = await supabase
    .from("internship_listings")
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) throw error;
};

export const deleteListing = async (
  id: string,
  logo?: string | null
): Promise<void> => {
  await deleteListingLogo(logo);

  const { error } = await supabase
    .from("internship_listings")
    .delete()
    .eq("id", id);

  if (error) throw error;
};
