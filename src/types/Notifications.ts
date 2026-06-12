export interface Notification {
  id: string;
  user_id: string | null;
  message: string;
  title: string | null;
  is_read: boolean;
  for_all: boolean;
  action_link: string | null;
  created_at: string;
  updated_at: string;
}

export type NotificationInsert = {
  title: string;
  body: string;
  type: "article" | "event" | "general";
  reference_id?: number | null;
};