import { useState, useEffect } from "react";
import {
  fetchCollegeExecutives,
  addCollegeExecutive,
  updateCollegeExecutive,
  deleteCollegeExecutive,
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
import { Plus, Loader2, AlertCircle } from "lucide-react";

type FormState =
  | { mode: "college"; editing: CollegeExecutive | null }
  | { mode: "department"; editing: DepartmentExecutive | null };

export default function Executives() {
  const [collegeExecs, setCollegeExecs] = useState<CollegeExecutive[]>([]);
  const [deptExecs, setDeptExecs] = useState<DepartmentExecutive[]>([]);
  const [loading, setLoading] = useState(true);
  const [formState, setFormState] = useState<FormState | null>(null);

  const loadAll = async () => {
    setLoading(true);
    try {
      const [college, dept] = await Promise.all([
        fetchCollegeExecutives(),
        fetchDepartmentExecutives(),
      ]);
      setCollegeExecs(college);
      setDeptExecs(dept);
    } catch (err) {
      console.error("Error loading executives:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  // ── Shared submit handler ──
  const handleSubmit = async (values: ExecutiveFormValues) => {
    let imageUrl = values.existingImage;
    if (values.imageFile) {
      imageUrl = await uploadExecutiveImage(values.imageFile);
    }

    if (formState?.mode === "college") {
      const payload = {
        name: values.name,
        position: values.position,
        phone: values.phone || null,
        email: values.email || null,
        description: values.description || null,
        image: imageUrl,
      };

      if (formState.editing) {
        await updateCollegeExecutive(formState.editing.id, payload, formState.editing.image);
      } else {
        await addCollegeExecutive(payload);
      }
    } else if (formState?.mode === "department") {
      const payload = {
        department: values.department as Department,
        name: values.name,
        position: values.position,
        phone: values.phone || null,
        email: values.email || null,
        description: values.description || null,
        image: imageUrl,
      };

      if (formState.editing) {
        await updateDepartmentExecutive(formState.editing.id, payload, formState.editing.image);
      } else {
        await addDepartmentExecutive(payload);
      }
    }

    setFormState(null);
    loadAll();
  };

  const handleDeleteCollege = async (exec: CollegeExecutive) => {
    if (!window.confirm(`Delete ${exec.name}?`)) return;
    try {
      await deleteCollegeExecutive(exec.id, exec.image);
      loadAll();
    } catch (err) {
      console.error(err);
      alert("Failed to delete.");
    }
  };

  const handleDeleteDept = async (exec: DepartmentExecutive) => {
    if (!window.confirm(`Delete ${exec.name}?`)) return;
    try {
      await deleteDepartmentExecutive(exec.id, exec.image);
      loadAll();
    } catch (err) {
      console.error(err);
      alert("Failed to delete.");
    }
  };

  const toFormValues = (
    exec: CollegeExecutive | DepartmentExecutive | null,
    mode: "college" | "department"
  ): ExecutiveFormValues | undefined => {
    if (!exec) return undefined;
    return {
      name: exec.name,
      position: exec.position,
      phone: exec.phone ?? "",
      email: exec.email ?? "",
      description: exec.description ?? "",
      department: mode === "department" ? (exec as DepartmentExecutive).department : undefined,
      imageFile: null,
      existingImage: exec.image,
    };
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-3">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        <p className="text-slate-500 font-medium">Loading executives...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Executives</h1>
        <p className="text-slate-500 text-sm mt-1">
          Manage college leadership and department executives shown on the mobile app.
        </p>
      </div>

      {/* Form */}
      {formState && (
        <ExecutiveForm
          mode={formState.mode}
          initialValues={toFormValues(formState.editing, formState.mode)}
          onSubmit={handleSubmit}
          onCancel={() => setFormState(null)}
        />
      )}

      {/* College Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-800">College Executives</h2>
            <p className="text-slate-500 text-sm">Top-level leadership of the college.</p>
          </div>
          <button
            onClick={() => setFormState({ mode: "college", editing: null })}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Executive</span>
          </button>
        </div>

        {collegeExecs.length === 0 ? (
          <EmptyState message="No college executives added yet." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {collegeExecs.map((exec) => (
              <ExecutiveCard
                key={exec.id}
                name={exec.name}
                position={exec.position}
                phone={exec.phone}
                email={exec.email}
                description={exec.description}
                image={exec.image}
                onEdit={() => setFormState({ mode: "college", editing: exec })}
                onDelete={() => handleDeleteCollege(exec)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Department Sections */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Department Executives</h2>
            <p className="text-slate-500 text-sm">Executives listed per department.</p>
          </div>
          <button
            onClick={() => setFormState({ mode: "department", editing: null })}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Executive</span>
          </button>
        </div>

        {DEPARTMENTS.map((dept) => {
          const execs = deptExecs.filter((e) => e.department === dept);
          if (execs.length === 0) return null;

          return (
            <div key={dept} className="space-y-3">
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">{dept}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {execs.map((exec) => (
                  <ExecutiveCard
                    key={exec.id}
                    name={exec.name}
                    position={exec.position}
                    phone={exec.phone}
                    email={exec.email}
                    description={exec.description}
                    image={exec.image}
                    onEdit={() => setFormState({ mode: "department", editing: exec })}
                    onDelete={() => handleDeleteDept(exec)}
                  />
                ))}
              </div>
            </div>
          );
        })}

        {deptExecs.length === 0 && (
          <EmptyState message="No department executives added yet." />
        )}
      </section>
    </div>
  );
}

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