import { supabase } from "../lib/supabaseClient";

export interface Purchase {
  id: number;
  created_at: string;
  buyer_name: string;
  item_name: string;
  amount: number;
  status: "completed" | "pending" | "refunded";
}

export const fetchPurchases = async (): Promise<Purchase[]> => {
  const { data, error } = await supabase
    .from("purchases")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as Purchase[]) || [];
};
