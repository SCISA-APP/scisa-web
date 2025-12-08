// src/pages/management/articles/index.tsx
import  { useState, useEffect } from "react";
import ArticleForm from "../../components/forms/ArticleForm";
import ArticleCard from "../../components/cards/ArticleCard";
import { fetchArticles } from "../../api/article";
import type { Article } from "../../types/Articles";

export default function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [showForm, setShowForm] = useState(false);

  const loadArticles = async () => {
    try {
      const data = await fetchArticles();
      setArticles(data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Articles / Events</h1>

      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {showForm ? "Cancel" : "Add Item"}
      </button>

      {showForm && (
        <ArticleForm
          onSuccess={() => { setShowForm(false); loadArticles(); }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {articles.length === 0 ? (
        <p>No items found. Add some above.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
