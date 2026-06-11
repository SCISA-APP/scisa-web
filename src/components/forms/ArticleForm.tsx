import React, { useState } from "react";
import { addArticle, uploadImage } from "./../../api/article";
import { ImagePlus, Loader2, Save, X } from "lucide-react";

interface Props {
  onSuccess: () => void;
  onCancel: () => void;
}

export default function ArticleForm({ onSuccess, onCancel }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"article" | "event">("article");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !type) return;

    setLoading(true);
    setError("");

    try {
      let imageUrl = "";
      if (selectedImage) {
        imageUrl = await uploadImage(selectedImage);
      }

      await addArticle({
        title,
        description,
        image: imageUrl || "",
        type,
        start_date: type === "event" && startDate ? new Date(startDate).toISOString() : null,
        end_date: type === "event" && endDate ? new Date(endDate).toISOString() : null,
      });

      setTitle("");
      setDescription("");
      setType("article");
      setStartDate("");
      setEndDate("");
      setSelectedImage(null);
      onSuccess();
    } catch (err: any) {
      console.error("Error adding article:", err);
      setError("Failed to publish post. Please check your Supabase configurations.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
      <div className="flex justify-between items-center border-b border-slate-100 pb-3">
        <h3 className="text-lg font-bold text-slate-800">Create New Post</h3>
        <button
          type="button"
          onClick={onCancel}
          className="text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-600 text-sm px-4 py-3 rounded-xl font-medium">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Title */}
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-250 rounded-xl text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600 outline-none transition"
            placeholder="e.g., General Assembly Announcement"
          />
        </div>

        {/* Type */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Post Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as "article" | "event")}
            required
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-250 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600 outline-none transition"
          >
            <option value="article">Article / News</option>
            <option value="event">Event</option>
          </select>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={4}
          className="w-full px-4 py-3 bg-slate-50 border border-slate-250 rounded-xl text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600 outline-none transition"
          placeholder="Write your announcement details here..."
        />
      </div>

      {/* Date Fields (Conditional for Events) */}
      {type === "event" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 border border-slate-100 rounded-xl animate-fadeIn">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Start Date & Time
            </label>
            <input
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="w-full px-4 py-2.5 bg-white border border-slate-250 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600 outline-none transition"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              End Date & Time (Optional)
            </label>
            <input
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-slate-250 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600 outline-none transition"
            />
          </div>
        </div>
      )}

      {/* Image File Selector */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Featured Image
        </label>
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2 px-4 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-250 rounded-xl cursor-pointer transition">
            <ImagePlus className="w-4 h-4 text-blue-600" />
            <span className="text-sm">Choose File</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
            />
          </label>
          <span className="text-xs text-slate-500 truncate max-w-xs">
            {selectedImage ? selectedImage.name : "No file chosen"}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-end pt-3 border-t border-slate-100">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-bold transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition flex items-center space-x-2 shadow-sm shadow-blue-500/10"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Publish Post</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
