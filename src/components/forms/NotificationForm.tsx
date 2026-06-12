import React, { useState } from "react";
import { addNotification } from "../../api/article";
import { Loader2, Send, X } from "lucide-react";

interface Props {
  onSuccess: () => void;
  onCancel: () => void;
}

export default function NotificationForm({ onSuccess, onCancel }: Props) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !body) return;

    setLoading(true);
    setError("");
    try {
      await addNotification({ title, message: body });
      setTitle("");
      setBody("");
      onSuccess();
    } catch (err) {
      console.error("Error creating notification:", err);
      setError("Failed to send notification.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
      <div className="flex justify-between items-center border-b border-slate-100 pb-3">
        <h3 className="text-lg font-bold text-slate-800">Send Notification</h3>
        <button type="button" onClick={onCancel} className="text-slate-400 hover:text-slate-600">
          <X className="w-5 h-5" />
        </button>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-600 text-sm px-4 py-3 rounded-xl font-medium">
          {error}
        </div>
      )}

      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-250 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600 outline-none transition"
          placeholder="e.g., Holiday Notice"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Message</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          rows={3}
          className="w-full px-4 py-3 bg-slate-50 border border-slate-250 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600 outline-none transition"
          placeholder="Short notification message..."
        />
      </div>

      <div className="flex gap-3 justify-end pt-3 border-t border-slate-100">
        <button type="button" onClick={onCancel} className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-bold transition">
          Cancel
        </button>
        <button type="submit" disabled={loading} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition flex items-center space-x-2">
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Send</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}