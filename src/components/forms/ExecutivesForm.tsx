import React, { useState } from "react";
import { ImagePlus, Loader2, Save, X } from "lucide-react";
import { DEPARTMENTS, type Department } from  "../../types/executives";

export interface ExecutiveFormValues {
  name: string;
  position: string;
  phone: string;
  email: string;
  description: string;
  department?: Department;
  imageFile: File | null;
  existingImage: string | null;
}

interface Props {
  mode: "college" | "department";
  initialValues?: ExecutiveFormValues;
  onSubmit: (values: ExecutiveFormValues) => Promise<void>;
  onCancel: () => void;
}

const emptyValues = (mode: "college" | "department"): ExecutiveFormValues => ({
  name: "",
  position: "",
  phone: "",
  email: "",
  description: "",
  department: mode === "department" ? DEPARTMENTS[0] : undefined,
  imageFile: null,
  existingImage: null,
});

export default function ExecutiveForm({ mode, initialValues, onSubmit, onCancel }: Props) {
  const [values, setValues] = useState<ExecutiveFormValues>(
    initialValues ?? emptyValues(mode)
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialValues?.existingImage ?? null
  );

  const handleImageChange = (file: File | null) => {
    setValues((v) => ({ ...v, imageFile: file }));
    setPreviewUrl(file ? URL.createObjectURL(file) : initialValues?.existingImage ?? null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!values.name || !values.position) return;
    if (mode === "department" && !values.department) return;

    setLoading(true);
    setError("");
    try {
      await onSubmit(values);
    } catch (err) {
      console.error("Error saving executive:", err);
      setError("Failed to save. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
      <div className="flex justify-between items-center border-b border-slate-100 pb-3">
        <h3 className="text-lg font-bold text-slate-800">
          {initialValues ? "Edit" : "Add"} {mode === "college" ? "College Executive" : "Department Executive"}
        </h3>
        <button type="button" onClick={onCancel} className="text-slate-400 hover:text-slate-600">
          <X className="w-5 h-5" />
        </button>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-600 text-sm px-4 py-3 rounded-xl font-medium">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Name</label>
          <input
            type="text"
            value={values.name}
            onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
            required
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-250 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600 outline-none transition"
            placeholder="e.g., Dr. John Doe"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Position</label>
          <input
            type="text"
            value={values.position}
            onChange={(e) => setValues((v) => ({ ...v, position: e.target.value }))}
            required
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-250 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600 outline-none transition"
            placeholder="e.g., Head of Department"
          />
        </div>

        {mode === "department" && (
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Department</label>
            <select
              value={values.department}
              onChange={(e) => setValues((v) => ({ ...v, department: e.target.value as Department }))}
              required
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-250 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600 outline-none transition"
            >
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Phone</label>
          <input
            type="text"
            value={values.phone}
            onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-250 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600 outline-none transition"
            placeholder="e.g., +233 123 456 789"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Email</label>
          <input
            type="email"
            value={values.email}
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-250 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600 outline-none transition"
            placeholder="e.g., name@scisa.edu"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Description</label>
        <textarea
          value={values.description}
          onChange={(e) => setValues((v) => ({ ...v, description: e.target.value }))}
          rows={4}
          className="w-full px-4 py-3 bg-slate-50 border border-slate-250 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600 outline-none transition"
          placeholder="Short bio or responsibilities..."
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Profile Image</label>
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2 px-4 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-250 rounded-xl cursor-pointer transition">
            <ImagePlus className="w-4 h-4 text-blue-600" />
            <span className="text-sm">Choose File</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageChange(e.target.files?.[0] || null)}
            />
          </label>
          {previewUrl && (
            <img src={previewUrl} alt="Preview" className="w-12 h-12 rounded-full object-cover border border-slate-200" />
          )}
          <span className="text-xs text-slate-500 truncate max-w-xs">
            {values.imageFile ? values.imageFile.name : previewUrl ? "Current image" : "No file chosen"}
          </span>
        </div>
      </div>

      <div className="flex gap-3 justify-end pt-3 border-t border-slate-100">
        <button type="button" onClick={onCancel} className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-bold transition">
          Cancel
        </button>
        <button type="submit" disabled={loading} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition flex items-center space-x-2">
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}