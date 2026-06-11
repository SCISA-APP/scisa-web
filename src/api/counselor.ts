import { supabase } from "../lib/supabaseClient";

export interface Counselor {
  id: number;
  created_at: string;
  name: string;
  role: string;
  phone: string;
  availability: string;
  image?: string;
}

export interface CounselorInsert {
  name: string;
  role: string;
  phone: string;
  availability: string;
  image?: string;
}

export const fetchCounselors = async (): Promise<Counselor[]> => {
  const { data, error } = await supabase
    .from("counselors")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as Counselor[]) || [];
};

export const uploadCounselorImage = async (file: File): Promise<string> => {
  const fileName = `counselor_${Date.now()}_${file.name}`;
  const { error } = await supabase.storage.from("articles").upload(fileName, file);

  if (error) throw error;

  const { data } = supabase.storage.from("articles").getPublicUrl(fileName);
  return data?.publicUrl || "";
};

export const addCounselor = async (counselor: CounselorInsert): Promise<void> => {
  const { error } = await supabase.from("counselors").insert([counselor]);
  if (error) throw error;
};

export const updateCounselor = async (id: number, counselor: Partial<CounselorInsert>): Promise<void> => {
  const { error } = await supabase.from("counselors").update(counselor).eq("id", id);
  if (error) throw error;
};

export const deleteCounselor = async (id: number): Promise<void> => {
  const { error } = await supabase.from("counselors").delete().eq("id", id);
  if (error) throw error;
};
