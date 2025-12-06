// src/pages/management/articles/api.ts
import { supabase } from "../lib/supabaseClient";
import type { Article,ArticleInsert } from "../types/Articles";

export const fetchArticles = async (): Promise<Article[]> => {
  const { data, error } = await supabase
    .from<Article>("articles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
};

export const uploadImage = async (file: File): Promise<string> => {
  const fileName = `${Date.now()}_${file.name}`;
  const { error } = await supabase.storage.from("articles").upload(fileName, file);

  if (error) throw error;

  const { data } = supabase.storage.from("articles").getPublicUrl(fileName);
  return data?.publicUrl || "";
};

export const addArticle = async (article: ArticleInsert) => {
  const { error } = await supabase.from<ArticleInsert>("articles").insert([article]);
  if (error) throw error;
};
