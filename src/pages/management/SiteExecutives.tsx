import { useState, useEffect, useRef } from "react";
import {
  fetchSiteExecutives,
  updateSiteExecutive,
  uploadSiteExecutiveImage,
} from "../../api/siteExecutives";
import type { SiteExecutive } from "../../types/SiteExecutives";
import { Upload, Loader2, CheckCircle2, AlertCircle, User, Pencil, X } from "lucide-react";

// ── Per-card editor ────────────────────────────────────────────────────────

interface CardProps {
  exec: SiteExecutive;
  onSaved: () => void;
}

function ExecutiveEditor({ exec, onSaved }: CardProps) {
  const [name, setName] = useState(exec.name ?? "");
  const [preview, setPreview] = useState<string | null>(exec.image ?? null);
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.files?.[0];
    if (!picked) return;
    setFile(picked);
    setPreview(URL.createObjectURL(picked));
    setStatus("idle");
  };

  const handleSave = async () => {
    setSaving(true);
    setStatus("idle");
    try {
      let imageUrl = exec.image;
      if (file) {
        imageUrl = await uploadSiteExecutiveImage(file);
      }
      await updateSiteExecutive(
        exec.id,
        { name: name.trim() || null, image: imageUrl },
        exec.image
      );
      setStatus("success");
      setFile(null);
      onSaved();
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setSaving(false);
    }
  };

  const isDirty = name !== (exec.name ?? "") || file !== null;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Image area */}
      <div className="relative group aspect-square bg-slate-100 overflow-hidden">
        {preview ? (
          <img
            src={preview}
            alt={exec.position}
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <User className="w-16 h-16 text-slate-300" />
          </div>
        )}

        {/* Hover overlay to trigger file picker */}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100"
          aria-label={`Change photo for ${exec.position}`}
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-2 text-slate-800 text-sm font-semibold shadow">
            <Upload className="w-4 h-4" />
            Change Photo
          </div>
        </button>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* New file indicator */}
        {file && (
          <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
            <Pencil className="w-3 h-3" />
            New photo
          </div>
        )}
      </div>

      {/* Fields */}
      <div className="p-4 space-y-3">
        {/* Position badge */}
        <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">
          {exec.position}
        </p>

        {/* Name input */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value); setStatus("idle"); }}
            placeholder={`Enter ${exec.position}'s name`}
            className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
          />
        </div>

        {/* Last updated */}
        <p className="text-xs text-slate-400">
          Last updated: {new Date(exec.updated_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
        </p>

        {/* Save button + status */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={handleSave}
            disabled={saving || !isDirty}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl text-sm font-bold transition"
          >
            {saving ? (
              <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving…</>
            ) : (
              "Save Changes"
            )}
          </button>

          {file && (
            <button
              onClick={() => { setFile(null); setPreview(exec.image ?? null); setStatus("idle"); }}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 transition"
              title="Discard photo"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {status === "success" && (
          <div className="flex items-center gap-2 text-green-600 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4" /> Saved successfully
          </div>
        )}
        {status === "error" && (
          <div className="flex items-center gap-2 text-rose-600 text-xs font-semibold">
            <AlertCircle className="w-4 h-4" /> Failed to save. Try again.
          </div>
        )}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────

export default function SiteExecutivesPage() {
  const [executives, setExecutives] = useState<SiteExecutive[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      const data = await fetchSiteExecutives();
      setExecutives(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load executives. Check your Supabase connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
          Website Executives
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Update the name and photo for each executive position shown on the landing page and executives page.
          Changes reflect immediately on the website.
        </p>
      </div>

      {/* Info banner */}
      <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-2xl p-4 text-sm text-blue-700">
        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
        <p>
          Each card represents a <strong>fixed position</strong>. Hover over the photo and click to upload a new one,
          update the name, then hit <strong>Save Changes</strong>. Photos are stored in Supabase storage.
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
          <p className="text-slate-500 font-medium">Loading executives…</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center border border-dashed border-rose-200 rounded-3xl p-16 text-center bg-white gap-3">
          <AlertCircle className="w-10 h-10 text-rose-400" />
          <p className="text-slate-600 font-medium">{error}</p>
          <button
            onClick={load}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition"
          >
            Retry
          </button>
        </div>
      ) : (
        <>
          {/* Top 3 — main exec */}
          <div>
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">
              Main Executive
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {executives.slice(0, 3).map((exec) => (
                <ExecutiveEditor key={exec.id} exec={exec} onSaved={load} />
              ))}
            </div>
          </div>

          {/* Bottom 3 */}
          <div>
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">
              Supporting Executives
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {executives.slice(3).map((exec) => (
                <ExecutiveEditor key={exec.id} exec={exec} onSaved={load} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
