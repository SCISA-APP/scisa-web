import { useState, useEffect } from "react";
import type { Listing, ListingInsert, ListingType, Department } from "../../types/Internship";
import { LISTING_DEPARTMENTS, LISTING_TYPES } from "../../types/Internship";
import { X, Upload, Plus, Trash2 } from "lucide-react";

export interface InternshipFormValues extends ListingInsert {
  logoFile: File | null;
  existingLogo?: string;
}

interface Props {
  initialValues?: InternshipFormValues;
  onSubmit: (values: InternshipFormValues) => Promise<void>;
  onCancel: () => void;
  editing?: Listing | null;
}

const TINT_COLORS = [
  "#8B0000", "#1E3A5F", "#065F46", "#78350F",
  "#1E1B4B", "#701A75", "#0F172A", "#134E4A",
];

const defaultValues: InternshipFormValues = {
  company: "",
  logo: "",
  location: "",
  role: "",
  department: "Computer Science",
  type: "Internship",
  stipend: undefined,
  duration: "",
  deadline: "",
  description: "",
  skills: [],
  contact: { email: "", phone: "", name: "" },
  tint: "#8B0000",
  logoFile: null,
  existingLogo: "",
};

export default function InternshipForm({ initialValues, onSubmit, onCancel }: Props) {
  const [values, setValues] = useState<InternshipFormValues>(initialValues ?? defaultValues);
  const [submitting, setSubmitting] = useState(false);
  const [skillInput, setSkillInput] = useState("");
  const [hasStipend, setHasStipend] = useState(!!initialValues?.stipend);
  const [logoPreview, setLogoPreview] = useState<string | null>(
    initialValues?.existingLogo || initialValues?.logo || null
  );

  useEffect(() => {
    if (initialValues) {
      setValues(initialValues);
      setHasStipend(!!initialValues.stipend);
      setLogoPreview(initialValues.existingLogo || initialValues.logo || null);
    }
  }, [initialValues]);

  const set = <K extends keyof InternshipFormValues>(key: K, val: InternshipFormValues[K]) =>
    setValues((v) => ({ ...v, [key]: val }));

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    set("logoFile", file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (!trimmed || values.skills.includes(trimmed)) return;
    set("skills", [...values.skills, trimmed]);
    setSkillInput("");
  };

  const removeSkill = (skill: string) =>
    set("skills", values.skills.filter((s) => s !== skill));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload: InternshipFormValues = {
        ...values,
        stipend: hasStipend && values.stipend ? values.stipend : undefined,
      };
      await onSubmit(payload);
    } finally {
      setSubmitting(false);
    }
  };

  const fieldClass =
    "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none text-sm transition";

  const labelClass = "block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6"
    >
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <h2 className="text-lg font-bold text-slate-800">
          {initialValues ? "Edit Listing" : "Add New Listing"}
        </h2>
        <button
          type="button"
          onClick={onCancel}
          className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Row 1: Company + Role */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Company *</label>
          <input
            className={fieldClass}
            placeholder="e.g. Vodafone Ghana"
            value={values.company}
            onChange={(e) => set("company", e.target.value)}
            required
          />
        </div>
        <div>
          <label className={labelClass}>Role / Position *</label>
          <input
            className={fieldClass}
            placeholder="e.g. Software Engineering Intern"
            value={values.role}
            onChange={(e) => set("role", e.target.value)}
            required
          />
        </div>
      </div>

      {/* Row 2: Location + Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Location *</label>
          <input
            className={fieldClass}
            placeholder="e.g. Accra, Ghana"
            value={values.location}
            onChange={(e) => set("location", e.target.value)}
            required
          />
        </div>
        <div>
          <label className={labelClass}>Type *</label>
          <select
            className={fieldClass}
            value={values.type}
            onChange={(e) => set("type", e.target.value as ListingType)}
            required
          >
            {LISTING_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 3: Department + Duration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Department *</label>
          <select
            className={fieldClass}
            value={values.department}
            onChange={(e) => set("department", e.target.value as Department)}
            required
          >
            {LISTING_DEPARTMENTS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Duration *</label>
          <input
            className={fieldClass}
            placeholder="e.g. 3 months"
            value={values.duration}
            onChange={(e) => set("duration", e.target.value)}
            required
          />
        </div>
      </div>

      {/* Row 4: Deadline + Tint */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Application Deadline *</label>
          <input
            type="date"
            className={fieldClass}
            value={values.deadline}
            onChange={(e) => set("deadline", e.target.value)}
            required
          />
        </div>
        <div>
          <label className={labelClass}>Card Accent Color *</label>
          <div className="flex items-center gap-2 flex-wrap">
            {TINT_COLORS.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => set("tint", color)}
                style={{ backgroundColor: color }}
                className={`w-8 h-8 rounded-full border-2 transition ${
                  values.tint === color ? "border-blue-500 scale-110" : "border-transparent"
                }`}
              />
            ))}
            <input
              type="color"
              value={values.tint}
              onChange={(e) => set("tint", e.target.value)}
              className="w-8 h-8 rounded-full border border-slate-200 cursor-pointer"
              title="Custom color"
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className={labelClass}>Description *</label>
        <textarea
          className={`${fieldClass} resize-none`}
          rows={4}
          placeholder="Describe the role, responsibilities, and requirements..."
          value={values.description}
          onChange={(e) => set("description", e.target.value)}
          required
        />
      </div>

      {/* Skills */}
      <div>
        <label className={labelClass}>Required Skills</label>
        <div className="flex gap-2 mb-2">
          <input
            className={fieldClass}
            placeholder="Add a skill and press Enter"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addSkill();
              }
            }}
          />
          <button
            type="button"
            onClick={addSkill}
            className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        {values.skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {values.skills.map((skill) => (
              <span
                key={skill}
                className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-700 text-xs rounded-full font-medium"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="text-slate-400 hover:text-rose-500 transition"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Stipend */}
      <div>
        <label className="flex items-center gap-2 cursor-pointer mb-3">
          <input
            type="checkbox"
            checked={hasStipend}
            onChange={(e) => setHasStipend(e.target.checked)}
            className="w-4 h-4 rounded border-slate-300 text-blue-600"
          />
          <span className="text-sm font-bold text-slate-700">This listing includes a stipend</span>
        </label>
        {hasStipend && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <label className={labelClass}>Amount *</label>
              <input
                type="number"
                className={fieldClass}
                placeholder="e.g. 800"
                value={values.stipend?.amount ?? ""}
                onChange={(e) =>
                  set("stipend", {
                    amount: Number(e.target.value),
                    currency: values.stipend?.currency ?? "GHS",
                    period: values.stipend?.period ?? "monthly",
                  })
                }
              />
            </div>
            <div>
              <label className={labelClass}>Currency</label>
              <input
                className={fieldClass}
                placeholder="e.g. GHS"
                value={values.stipend?.currency ?? "GHS"}
                onChange={(e) =>
                  set("stipend", {
                    amount: values.stipend?.amount ?? 0,
                    currency: e.target.value,
                    period: values.stipend?.period ?? "monthly",
                  })
                }
              />
            </div>
            <div>
              <label className={labelClass}>Period</label>
              <select
                className={fieldClass}
                value={values.stipend?.period ?? "monthly"}
                onChange={(e) =>
                  set("stipend", {
                    amount: values.stipend?.amount ?? 0,
                    currency: values.stipend?.currency ?? "GHS",
                    period: e.target.value as "monthly" | "weekly" | "total",
                  })
                }
              >
                <option value="monthly">Monthly</option>
                <option value="weekly">Weekly</option>
                <option value="total">Total</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Contact Info */}
      <div>
        <label className={labelClass}>Contact Information</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
          <div>
            <label className="block text-xs text-slate-500 mb-1">Contact Name</label>
            <input
              className={fieldClass}
              placeholder="HR Manager"
              value={values.contact.name ?? ""}
              onChange={(e) => set("contact", { ...values.contact, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1">Email</label>
            <input
              type="email"
              className={fieldClass}
              placeholder="hr@company.com"
              value={values.contact.email ?? ""}
              onChange={(e) => set("contact", { ...values.contact, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1">Phone</label>
            <input
              type="tel"
              className={fieldClass}
              placeholder="+233 XX XXX XXXX"
              value={values.contact.phone ?? ""}
              onChange={(e) => set("contact", { ...values.contact, phone: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Logo Upload */}
      <div>
        <label className={labelClass}>Company Logo (optional)</label>
        <div className="flex items-center gap-4">
          {logoPreview ? (
            <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-200 bg-white flex items-center justify-center">
              <img src={logoPreview} alt="Logo preview" className="w-full h-full object-contain p-1" />
              <button
                type="button"
                onClick={() => {
                  setLogoPreview(null);
                  set("logoFile", null);
                  set("logo", "");
                  set("existingLogo", "");
                }}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-rose-500 text-white rounded-full flex items-center justify-center"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <label className="flex items-center gap-2 px-4 py-2.5 border border-dashed border-slate-300 rounded-xl text-slate-500 hover:bg-slate-50 cursor-pointer transition text-sm">
              <Upload className="w-4 h-4" />
              <span>Upload Logo</span>
              <input type="file" accept="image/*" onChange={handleLogoChange} className="hidden" />
            </label>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2 border-t border-slate-100">
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 md:flex-none px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl font-bold text-sm transition"
        >
          {submitting ? "Saving..." : initialValues ? "Save Changes" : "Add Listing"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-sm transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
