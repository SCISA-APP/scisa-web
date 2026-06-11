import { supabase } from "../lib/supabaseClient";

export interface Concern {
  id: number;
  created_at: string;
  title: string;
  description: string;
  category: string;
  is_anonymous: boolean;
  status: "pending" | "investigating" | "resolved";
}

export const fetchConcerns = async (): Promise<Concern[]> => {
  const { data, error } = await supabase
    .from("concerns")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as Concern[]) || [];
};

export const updateConcernStatus = async (id: number, status: "pending" | "investigating" | "resolved"): Promise<void> => {
  const { error } = await supabase.from("concerns").update({ status }).eq("id", id);
  if (error) throw error;
};
