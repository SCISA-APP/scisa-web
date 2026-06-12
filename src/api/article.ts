import { supabase } from "../lib/supabaseClient";
import type { Article, ArticleInsert } from "../types/Articles";
import type { Notification } from "../types/Notifications";

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
  const { data, error } = await supabase
    .from("articles")
    .insert([article])
    .select()
    .single();

  if (error) throw error;

  const { error: notifError } = await supabase.from("notifications").insert({
    title: article.type === "event" ? `New Event: ${article.title}` : article.title,
    message: article.description.slice(0, 140),
    for_all: true,
    user_id: null,
    action_link: `/${article.type}s/${data.id}`, // adjust to your app's routing
  });

  if (notifError) console.error("Error creating notification:", notifError);
};

export const deleteArticle = async (id: number): Promise<void> => {
  const { error } = await supabase.from("articles").delete().eq("id", id);
  if (error) throw error;
};

// --- Standalone notifications (not tied to an article/event) ---

export const fetchNotifications = async (): Promise<Notification[]> => {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) throw error;
  return (data as Notification[]) || [];
};

export const addNotification = async (notification: { title: string; message: string }): Promise<void> => {
  const { error } = await supabase.from("notifications").insert({
    ...notification,
    for_all: true,
    user_id: null,
  });
  if (error) throw error;
};

export const deleteNotification = async (id: number): Promise<void> => {
  const { error } = await supabase.from("notifications").delete().eq("id", id);
  if (error) throw error;
};