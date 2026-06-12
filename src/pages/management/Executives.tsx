import { useState, useEffect, useRef } from "react";

// Website (site_executives → landing page + /executives)
import {
  fetchSiteExecutives,
  updateSiteExecutive,
  uploadSiteExecutiveImage,
} from "../../api/siteExecutives";
import type { SiteExecutive } from "../../types/SiteExecutives";

// Mobile app (college_executives + department_executives)
import {
  fetchCollegeExecutives,
  addCollegeExecutive,
  updateCollegeExecutive,
  fetchDepartmentExecutives,
  addDepartmentExecutive,
  updateDepartmentExecutive,
  deleteDepartmentExecutive,
  uploadExecutiveImage,
} from "../../api/executives";
import type {
  CollegeExecutive,
  DepartmentExecutive,
  Department,
} from "../../types/executives";
import { DEPARTMENTS } from "../../types/executives";
import ExecutiveForm, { type ExecutiveFormValues } from "../../components/forms/ExecutivesForm";
import ExecutiveCard from "../../components/cards/ExecutiveCard";

import {
  Plus, Loader2, AlertCircle, Upload,
  CheckCircle2, User, Pencil, X,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Unified position card — saves to BOTH site_executives AND college_executives
// ─────────────────────────────────────────────────────────────────────────────

function PositionCard({
  siteExec,
  collegeExec,
  onSaved,
}: {
  siteExec: SiteExecutive;
  collegeExec: CollegeExecutive | null;
  onSaved: () => void;
}) {
  const [name, setName] = useState(siteExec.name ?? "");
  const [preview, setPreview] = useState<string | null>(siteExec.image ?? null);
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
      // Upload image once, reuse the URL for both saves
      let imageUrl: string | null = siteExec.image;
      if (file) {
        imageUrl = await uploadSiteExecutiveImage(file);
      }

      const trimmedName = name.trim() || null;

      // 1. Update website (site_executives)
      await updateSiteExecutive(
        siteExec.id,
        { name: trimmedName, image: imageUrl },
        siteExec.image
      );

      // 2. Update or create mobile app college executive
      const mobilePayload = {
        name: trimmedName ?? "",
        position: siteExec.position,
        image: imageUrl,
        phone: collegeExec?.phone ?? null,
        email: collegeExec?.email ?? null,
        description: collegeExec?.description ?? null,
      };

      if (collegeExec) {
        await updateCollegeExecutive(collegeExec.id, mobilePayload, collegeExec.image);
      } else {
        await addCollegeExecutive(mobilePayload);
      }

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

  const isDirty = name !== (siteExec.name ?? "") || file !== null;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Photo */}
      <div className="relative group aspect-square bg-slate-100 overflow-hidden">
        {preview ? (
          <img
            src={preview}
            alt={siteExec.position}
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <User className="w-16 h-16 text-slate-300" />
          </div>
        )}

        {/* Hover overlay */}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100"
          aria-label={`Change photo for ${siteExec.position}`}
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-2 text-slate-800 text-sm font-semibold shadow">
            <Upload className="w-4 h-4" /> Change Photo
          </div>
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {file && (
          <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
            <Pencil className="w-3 h-3" /> New photo
          </div>
        )}
      </div>

      {/* Fields */}
      <div className="p-4 space-y-3">
        <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">
          {siteExec.position}
        </p>

        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value); setStatus("idle"); }}
            placeholder={`Enter ${siteExec.position}'s name`}
            className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
          />
        </div>

        <p className="text-xs text-slate-400">
          Updated: {new Date(siteExec.updated_at).toLocaleDateString("en-GB", {
            day: "numeric", month: "short", year: "numeric",
          })}
        </p>

        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={handleSave}
            disabled={saving || !isDirty}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl text-sm font-bold transition"
          >
            {saving
              ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving…</>
              : "Save Changes"}
          </button>
          {file && (
            <button
              onClick={() => { setFile(null); setPreview(siteExec.image ?? null); setStatus("idle"); }}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 transition"
              title="Discard photo"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {status === "success" && (
          <p className="flex items-center gap-2 text-green-600 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4" /> Saved to website &amp; mobile app
          </p>
        )}
        {status === "error" && (
          <p className="flex items-center gap-2 text-rose-600 text-xs font-semibold">
            <AlertCircle className="w-4 h-4" /> Failed to save. Try again.
          </p>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center border border-dashed border-slate-300 rounded-3xl p-12 text-center bg-white">
      <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200 mb-3 text-slate-400">
        <AlertCircle className="w-7 h-7" />
      </div>
      <p className="text-slate-500 text-sm">{message}</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────────────────────────────────────

type DeptFormState =
  | { editing: DepartmentExecutive | null };

export default function ExecutivesManagement() {
  const [siteExecs, setSiteExecs] = useState<SiteExecutive[]>([]);
  const [collegeExecs, setCollegeExecs] = useState<CollegeExecutive[]>([]);
  const [deptExecs, setDeptExecs] = useState<DepartmentExecutive[]>([]);
  const [loading, setLoading] = useState(true);
  const [deptFormState, setDeptFormState] = useState<DeptFormState | null>(null);

  const loadAll = async () => {
    setLoading(true);
    try {
      const [site, college, dept] = await Promise.all([
        fetchSiteExecutives(),
        fetchCollegeExecutives(),
        fetchDepartmentExecutives(),
      ]);
      setSiteExecs(site);
      setCollegeExecs(college);
      setDeptExecs(dept);
    } catch (err) {
      console.error("Failed to load executives:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadAll(); }, []);

  // ── Department executive handlers ──

  const handleDeptSubmit = async (values: ExecutiveFormValues) => {
    let imageUrl = values.existingImage;
    if (values.imageFile) imageUrl = await uploadExecutiveImage(values.imageFile);

    const payload = {
      department: values.department as Department,
      name: values.name,
      position: values.position,
      phone: values.phone || null,
      email: values.email || null,
      description: values.description || null,
      image: imageUrl,
    };

    if (deptFormState?.editing) {
      await updateDepartmentExecutive(deptFormState.editing.id, payload, deptFormState.editing.image);
    } else {
      await addDepartmentExecutive(payload);
    }
    setDeptFormState(null);
    loadAll();
  };

  const handleDeleteDept = async (exec: DepartmentExecutive) => {
    if (!window.confirm(`Delete ${exec.name}?`)) return;
    try { await deleteDepartmentExecutive(exec.id, exec.image); loadAll(); }
    catch { alert("Failed to delete."); }
  };

  const toDeptFormValues = (exec: DepartmentExecutive | null): ExecutiveFormValues | undefined => {
    if (!exec) return undefined;
    return {
      name: exec.name, position: exec.position,
      phone: exec.phone ?? "", email: exec.email ?? "",
      description: exec.description ?? "",
      department: exec.department,
      imageFile: null, existingImage: exec.image,
    };
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        <p className="text-slate-500 font-medium">Loading executives…</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Executives</h1>
        <p className="text-slate-500 text-sm mt-1">
          Update name and photo for each position. Changes apply to both the website and the mobile app simultaneously.
        </p>
      </div>

      {/* ── SCISA Executives (6 fixed positions) ── */}
      <section className="space-y-5">
        <div>
          <h2 className="text-lg font-bold text-slate-800">SCISA Executives</h2>
          <p className="text-slate-500 text-sm mt-0.5">
            The 6 elected positions. Saving here updates the landing page, /executives, and the mobile app.
          </p>
        </div>

        {/* Row 1 */}
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Main Executives</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {siteExecs.slice(0, 3).map((se) => (
              <PositionCard
                key={se.id}
                siteExec={se}
                collegeExec={collegeExecs.find((c) => c.position === se.position) ?? null}
                onSaved={loadAll}
              />
            ))}
          </div>
        </div>

        {/* Row 2 */}
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Supporting Executives</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {siteExecs.slice(3).map((se) => (
              <PositionCard
                key={se.id}
                siteExec={se}
                collegeExec={collegeExecs.find((c) => c.position === se.position) ?? null}
                onSaved={loadAll}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-slate-200" />

      {/* ── Department Executives (mobile app only) ── */}
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Department Executives</h2>
            <p className="text-slate-500 text-sm mt-0.5">
              Per-department representatives — shown on the mobile app only.
            </p>
          </div>
          <button
            onClick={() => setDeptFormState({ editing: null })}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition text-sm"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>

        {/* Form */}
        {deptFormState && (
          <ExecutiveForm
            mode="department"
            initialValues={toDeptFormValues(deptFormState.editing)}
            onSubmit={handleDeptSubmit}
            onCancel={() => setDeptFormState(null)}
          />
        )}

        {/* Grid per department */}
        {DEPARTMENTS.map((dept) => {
          const execs = deptExecs.filter((e) => e.department === dept);
          if (execs.length === 0) return null;
          return (
            <div key={dept} className="space-y-3">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">{dept}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {execs.map((exec) => (
                  <ExecutiveCard
                    key={exec.id}
                    name={exec.name} position={exec.position}
                    phone={exec.phone} email={exec.email}
                    description={exec.description} image={exec.image}
                    onEdit={() => setDeptFormState({ editing: exec })}
                    onDelete={() => handleDeleteDept(exec)}
                  />
                ))}
              </div>
            </div>
          );
        })}

        {deptExecs.length === 0 && !deptFormState && (
          <EmptyState message="No department executives added yet." />
        )}
      </section>
    </div>
  );
}
