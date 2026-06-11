import { supabase } from "../lib/supabaseClient";

export interface Bursary {
  id: number;
  created_at: string;
  title: string;
  description: string;
  amount: string;
  deadline: string;
  status: "open" | "closed";
}

export interface BursaryInsert {
  title: string;
  description: string;
  amount: string;
  deadline: string;
  status: "open" | "closed";
}

export interface BursaryApplication {
  id: number;
  created_at: string;
  bursary_id: number;
  student_name: string;
  student_id: string;
  email: string;
  gpa: number;
  details: string;
  document_url?: string;
  status: "pending" | "approved" | "rejected";
  bursaries?: {
    title: string;
  };
}

export const fetchBursaries = async (): Promise<Bursary[]> => {
  const { data, error } = await supabase
    .from("bursaries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as Bursary[]) || [];
};

export const addBursary = async (bursary: BursaryInsert): Promise<void> => {
  const { error } = await supabase.from("bursaries").insert([bursary]);
  if (error) throw error;
};

export const updateBursary = async (id: number, bursary: Partial<BursaryInsert>): Promise<void> => {
  const { error } = await supabase.from("bursaries").update(bursary).eq("id", id);
  if (error) throw error;
};

export const deleteBursary = async (id: number): Promise<void> => {
  const { error } = await supabase.from("bursaries").delete().eq("id", id);
  if (error) throw error;
};

export const fetchBursaryApplications = async (): Promise<BursaryApplication[]> => {
  const { data, error } = await supabase
    .from("bursary_applications")
    .select(`
      *,
      bursaries (
        title
      )
    `)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as any[]) || [];
};

export const updateApplicationStatus = async (id: number, status: "pending" | "approved" | "rejected"): Promise<void> => {
  const { error } = await supabase.from("bursary_applications").update({ status }).eq("id", id);
  if (error) throw error;
};
