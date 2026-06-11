import { useState, useEffect } from "react";
import ArticleForm from "../../components/forms/ArticleForm";
import ArticleCard from "../../components/cards/ArticleCard";
import { fetchArticles, deleteArticle } from "../../api/article";
import type { Article } from "../../types/Articles";
import { Plus, Search, AlertCircle, Loader2 } from "lucide-react";

export default function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "article" | "event">("all");

  const loadArticles = async () => {
    setLoading(true);
    try {
      const data = await fetchArticles();
      setArticles(data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await deleteArticle(id);
      loadArticles();
    } catch (error) {
      console.error("Error deleting article:", error);
      alert("Failed to delete post.");
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const filteredArticles = articles.filter((a) => {
    const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          a.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || a.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Articles & Events</h1>
          <p className="text-slate-500 text-sm mt-1">
            Publish and manage news articles, announcements, and college events for the mobile app.
          </p>
        </div>

        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center justify-center space-x-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition shadow-md shadow-blue-500/10 shrink-0 text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Article / Event</span>
          </button>
        )}
      </div>

      {/* Form Container */}
      {showForm && (
        <div className="animate-fadeIn">
          <ArticleForm
            onSuccess={() => {
              setShowForm(false);
              loadArticles();
            }}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      {/* Filters & Search Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 border border-slate-200 rounded-2xl shadow-sm">
        {/* Search */}
        <div className="relative w-full md:max-w-xs">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none text-sm transition"
          />
        </div>

        {/* Tab-like filter */}
        <div className="flex bg-slate-100/80 border border-slate-200 p-1 rounded-xl w-full md:w-auto">
          {(["all", "article", "event"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`flex-1 md:flex-initial px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition ${
                filterType === type
                  ? "bg-white text-blue-600 border border-slate-200 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {type === "all" ? "All Posts" : type + "s"}
            </button>
          ))}
        </div>
      </div>

      {/* List content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-3">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
          <p className="text-slate-500 font-medium">Fetching articles...</p>
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="flex flex-col items-center justify-center border border-dashed border-slate-350 rounded-3xl p-16 text-center bg-white">
          <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200 mb-4 text-slate-400">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-850 mb-1">No items found</h3>
          <p className="text-slate-500 text-sm max-w-sm">
            {searchQuery 
              ? "We couldn't find any articles matching your search. Try adjusting filters."
              : "No articles or events have been created yet. Click 'Add Article / Event' to begin."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
