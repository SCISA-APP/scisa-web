import { supabase } from "../lib/supabaseClient";

export interface Seller {
  id: number;
  created_at: string;
  full_name: string;
  email: string;
  student_id: string;
  store_name: string;
  description: string;
  status: "pending" | "approved" | "rejected";
}

export const fetchSellers = async (): Promise<Seller[]> => {
  const { data, error } = await supabase
    .from("sellers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as Seller[]) || [];
};

export const updateSellerStatus = async (id: number, status: "pending" | "approved" | "rejected"): Promise<void> => {
  const { error } = await supabase.from("sellers").update({ status }).eq("id", id);
  if (error) throw error;
};
