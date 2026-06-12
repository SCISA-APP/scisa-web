import { supabase } from "../lib/supabaseClient";
import type {
  CollegeExecutive,
  CollegeExecutiveInsert,
  DepartmentExecutive,
  DepartmentExecutiveInsert,
  Department,
} from "../types/executives";

const BUCKET = "executives";

// ── Image helpers ─────────────────────────────────────────────────────────

export const uploadExecutiveImage = async (file: File): Promise<string> => {
  const fileName = `${Date.now()}_${file.name}`;
  const { error } = await supabase.storage.from(BUCKET).upload(fileName, file);
  if (error) throw error;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(fileName);
  return data?.publicUrl || "";
};

// Extracts the storage path from a public URL so we can delete it later
const getPathFromPublicUrl = (url: string): string | null => {
  const marker = `/object/public/${BUCKET}/`;
  const idx = url.indexOf(marker);
  if (idx === -1) return null;
  return url.substring(idx + marker.length);
};

const deleteExecutiveImage = async (imageUrl: string | null) => {
  if (!imageUrl) return;
  const path = getPathFromPublicUrl(imageUrl);
  if (!path) return;

  const { error } = await supabase.storage.from(BUCKET).remove([path]);
  if (error) console.error("Error deleting old image:", error);
};

// ── College Executives ───────────────────────────────────────────────────

export const fetchCollegeExecutives = async (): Promise<CollegeExecutive[]> => {
  const { data, error } = await supabase
    .from("college_executives")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) throw error;
  return (data as CollegeExecutive[]) || [];
};

export const addCollegeExecutive = async (
  payload: CollegeExecutiveInsert
): Promise<void> => {
  const { error } = await supabase.from("college_executives").insert([payload]);
  if (error) throw error;
};

export const updateCollegeExecutive = async (
  id: number,
  payload: CollegeExecutiveInsert,
  previousImage: string | null
): Promise<void> => {
  // If the image changed, delete the old one from storage
  if (previousImage && previousImage !== payload.image) {
    await deleteExecutiveImage(previousImage);
  }

  const { error } = await supabase
    .from("college_executives")
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) throw error;
};

export const deleteCollegeExecutive = async (
  id: number,
  image: string | null
): Promise<void> => {
  await deleteExecutiveImage(image);

  const { error } = await supabase.from("college_executives").delete().eq("id", id);
  if (error) throw error;
};

// ── Department Executives ────────────────────────────────────────────────

export const fetchDepartmentExecutives = async (
  department?: Department
): Promise<DepartmentExecutive[]> => {
  let query = supabase
    .from("department_executives")
    .select("*")
    .order("department", { ascending: true })
    .order("created_at", { ascending: true });

  if (department) {
    query = query.eq("department", department);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data as DepartmentExecutive[]) || [];
};

export const addDepartmentExecutive = async (
  payload: DepartmentExecutiveInsert
): Promise<void> => {
  const { error } = await supabase.from("department_executives").insert([payload]);
  if (error) throw error;
};

export const updateDepartmentExecutive = async (
  id: number,
  payload: DepartmentExecutiveInsert,
  previousImage: string | null
): Promise<void> => {
  if (previousImage && previousImage !== payload.image) {
    await deleteExecutiveImage(previousImage);
  }

  const { error } = await supabase
    .from("department_executives")
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) throw error;
};

export const deleteDepartmentExecutive = async (
  id: number,
  image: string | null
): Promise<void> => {
  await deleteExecutiveImage(image);

  const { error } = await supabase.from("department_executives").delete().eq("id", id);
  if (error) throw error;
};