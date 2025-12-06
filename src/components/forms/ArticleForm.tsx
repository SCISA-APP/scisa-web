// src/pages/management/articles/ArticleForm.tsx
import React, { useState } from "react";
import { addArticle, uploadImage }  from "./../../api/article";


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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !type) return;

    setLoading(true);

    try {
      let imageUrl = "";
      if (selectedImage) {
        imageUrl = await uploadImage(selectedImage);
      }

  await addArticle({ title, description, image: imageUrl, type, start_date: startDate || null, end_date: endDate || null });
  setTitle("");
  setDescription("");
  setType("article");
  setStartDate("");
  setEndDate("");
  setSelectedImage(null);
      onSuccess();
    } catch (error) {
      console.error("Error adding article:", error);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded bg-white space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as "article" | "event")}
          required
          className="w-full px-3 py-2 border rounded outline-none focus:ring focus:ring-blue-300"
        >
          <option value="article">Article</option>
          <option value="event">Event</option>
        </select>
      </div>
{type === "event" && (
  <div className="grid grid-cols-2 gap-4">
    <div>
      <label className="block text-sm font-medium mb-1">Start</label>
      <input
        type="datetime-local"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="w-full px-3 py-2 border rounded outline-none focus:ring focus:ring-blue-300"
      />
    </div>
    <div>
      <label className="block text-sm font-medium mb-1">End (optional)</label>
      <input
        type="datetime-local"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="w-full px-3 py-2 border rounded outline-none focus:ring focus:ring-blue-300"
      />
      <small className="text-gray-500 text-xs">Leave empty for single-day events</small>
    </div>
  </div>
)}


      <div>
        <label className="block text-sm font-medium mb-1">Image</label>
        <input type="file" accept="image/*" onChange={(e) => setSelectedImage(e.target.files?.[0] || null)} />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          {loading ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
