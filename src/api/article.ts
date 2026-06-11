import { supabase } from "../lib/supabaseClient";
import type { Article, ArticleInsert } from "../types/Articles";

export const fetchArticles = async (): Promise<Article[]> => {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as Article[]) || [];
};

export const uploadImage = async (file: File): Promise<string> => {
  const fileName = `${Date.now()}_${file.name}`;
  const { error } = await supabase.storage.from("articles").upload(fileName, file);

  if (error) throw error;

  const { data } = supabase.storage.from("articles").getPublicUrl(fileName);
  return data?.publicUrl || "";
};

export const addArticle = async (article: ArticleInsert): Promise<void> => {
  const { error } = await supabase.from("articles").insert([article]);
  if (error) throw error;
};

export const deleteArticle = async (id: number): Promise<void> => {
  const { error } = await supabase.from("articles").delete().eq("id", id);
  if (error) throw error;
};
