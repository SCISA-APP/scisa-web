import type { Article } from "../../types/Articles";
import { Calendar, Trash2, BookOpen, Clock } from "lucide-react";

interface Props {
  article: Article;
  onDelete: (id: number) => void;
}

export default function ArticleCard({ article, onDelete }: Props) {
  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const words = article.description.split(" ");
  const truncatedDescription = 
    words.slice(0, 12).join(" ") + (words.length > 12 ? "..." : "");

  return (
    <div className="group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Cover Image */}
        <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
          {article.image ? (
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-blue-50 text-blue-400">
              {article.type === "event" ? <Calendar className="w-12 h-12" /> : <BookOpen className="w-12 h-12" />}
            </div>
          )}
          
          {/* Badge */}
          <span className={`absolute top-4 right-4 px-3 py-1 text-xs font-bold rounded-full shadow-sm uppercase tracking-wider ${
            article.type === "event"
              ? "bg-amber-50 text-amber-600 border border-amber-200"
              : "bg-blue-50 text-blue-600 border border-blue-200"
          }`}>
            {article.type}
          </span>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-200 line-clamp-1 mb-2">
            {article.title}
          </h3>
          <p className="text-slate-600 text-sm mb-4 leading-relaxed line-clamp-3 whitespace-pre-line">
            {truncatedDescription}
          </p>

          {/* Event Dates */}
          {article.type === "event" && (article.start_date || article.end_date) && (
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 space-y-1.5 text-xs text-slate-700 mb-2">
              <div className="flex items-center space-x-2">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                <span className="font-bold text-slate-500">Start:</span>
                <span>{formatDate(article.start_date) || "Not set"}</span>
              </div>
              {article.end_date && (
                <div className="flex items-center space-x-2">
                  <div className="w-3.5 h-3.5"></div>
                  <span className="font-bold text-slate-500">End:</span>
                  <span>{formatDate(article.end_date)}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="px-5 pb-4 pt-3 border-t border-slate-100 flex justify-between items-center bg-slate-50/50">
        <span className="text-xs text-slate-400">
          Posted {new Date(article.created_at).toLocaleDateString()}
        </span>
        <button
          onClick={() => onDelete(article.id)}
          className="p-2 bg-white hover:bg-rose-50 text-slate-400 hover:text-rose-600 border border-slate-200 hover:border-rose-100 rounded-xl transition-all duration-200"
          title="Delete Article"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
