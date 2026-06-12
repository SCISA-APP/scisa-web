import { useState, useEffect } from "react";
import ArticleForm from "../../components/forms/ArticleForm";
import ArticleCard from "../../components/cards/ArticleCard";
import { fetchArticles, deleteArticle, fetchNotifications } from "../../api/article";
import type { Article } from "../../types/Articles";
import type { Notification } from "../../types/Notifications";
import { Plus, Search, AlertCircle, Loader2, Bell } from "lucide-react";
import NotificationForm from "../../components/forms/NotificationForm";

export default function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifForm, setShowNotifForm] = useState(false);
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

  const loadNotifications = async () => {
    try {
      const data = await fetchNotifications();
      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
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
    loadNotifications();
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

        <div className="flex gap-3 shrink-0">
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center justify-center space-x-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition shadow-md shadow-blue-500/10 text-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Article / Event</span>
            </button>
          )}

          <button
            onClick={() => setShowNotifForm(true)}
            className="flex items-center justify-center space-x-2 px-4 py-2.5 bg-slate-700 hover:bg-slate-800 text-white rounded-xl font-bold transition shadow-md text-sm"
          >
            <Bell className="w-4 h-4" />
            <span>Send Notification</span>
          </button>
        </div>
      </div>

      {/* Form Containers */}
      {showForm && (
        <div className="animate-fadeIn">
          <ArticleForm
            onSuccess={() => {
              setShowForm(false);
              loadArticles();
              loadNotifications();
            }}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      {showNotifForm && (
        <div className="animate-fadeIn">
          <NotificationForm
            onSuccess={() => {
              setShowNotifForm(false);
              loadNotifications();
            }}
            onCancel={() => setShowNotifForm(false)}
          />
        </div>
      )}

      {/* Recent Notifications */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Bell className="w-4 h-4 text-blue-600" />
          <h3 className="text-sm font-bold text-slate-800">Recent Notifications</h3>
        </div>
        {notifications.length === 0 ? (
          <p className="text-sm text-slate-500">No notifications sent yet.</p>
        ) : (
          <ul className="space-y-2">
            {notifications.map((n) => (
              <li key={n.id} className="flex items-start justify-between text-sm border-b border-slate-100 last:border-0 pb-2 last:pb-0">
                <div>
                  <p className="font-semibold text-slate-800">{n.title}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{n.message}</p>
                </div>
                <span className="text-xs text-slate-400 shrink-0 ml-3">
                  {new Date(n.created_at).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Filters & Search Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 border border-slate-200 rounded-2xl shadow-sm">
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