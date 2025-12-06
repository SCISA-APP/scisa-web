export interface Article {
  id: number;
  title: string;
  description: string;
  image: string;
  type: "article" | "event";
  created_at: string;
    start_date?: string | null;
  end_date?: string | null;
}

export interface ArticleInsert {
  title: string;
  description: string;
  image: string;
  type: "article" | "event";
    start_date?: string | null;
  end_date?: string | null;
}