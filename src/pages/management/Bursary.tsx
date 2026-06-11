import { useState, useEffect } from "react";
import {
  fetchBursaries,
  addBursary,
  updateBursary,
  deleteBursary,
  fetchBursaryApplications,
  updateApplicationStatus
} from "../../api/bursary";
import type {
  Bursary as BursaryType,
  BursaryApplication
} from "../../api/bursary";
import { 
  Plus, 
  Trash2, 
  Eye, 
  Check, 
  X, 
  Calendar, 
  DollarSign, 
  Users, 
  Loader2, 
  Award,
  ExternalLink
} from "lucide-react";

type Tab = "programs" | "applications";

export default function Bursary() {
  const [activeTab, setActiveTab] = useState<Tab>("programs");
  const [bursaries, setBursaries] = useState<BursaryType[]>([]);
  const [applications, setApplications] = useState<BursaryApplication[]>([]);
  const [loading, setLoading] = useState(true);

  // Program form states
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [deadline, setDeadline] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);

  // Application detail modal
  const [selectedApp, setSelectedApp] = useState<BursaryApplication | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === "programs") {
        const data = await fetchBursaries();
        setBursaries(data);
      } else {
        const data = await fetchBursaryApplications();
        setApplications(data);
      }
    } catch (error) {
      console.error("Error loading bursary data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const handleCreateProgram = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !amount || !deadline) return;
    setSaveLoading(true);

    try {
      await addBursary({
        title,
        description,
        amount,
        deadline: new Date(deadline).toISOString(),
        status: "open",
      });
      setTitle("");
      setDescription("");
      setAmount("");
      setDeadline("");
      setShowForm(false);
      loadData();
    } catch (error) {
      console.error("Error creating bursary:", error);
      alert("Failed to create bursary program.");
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDeleteProgram = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this bursary program?")) return;
    try {
      await deleteBursary(id);
      loadData();
    } catch (error) {
      console.error("Error deleting bursary:", error);
      alert("Failed to delete bursary.");
    }
  };

  const handleToggleStatus = async (id: number, currentStatus: "open" | "closed") => {
    const nextStatus = currentStatus === "open" ? "closed" : "open";
    try {
      await updateBursary(id, { status: nextStatus });
      loadData();
    } catch (error) {
      console.error("Error updating bursary status:", error);
    }
  };

  const handleUpdateAppStatus = async (id: number, status: "approved" | "rejected") => {
    try {
      await updateApplicationStatus(id, status);
      setSelectedApp(null);
      loadData();
    } catch (error) {
      console.error("Error updating application status:", error);
      alert("Failed to update application status.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">SCISA Bursary Scheme</h1>
          <p className="text-slate-500 text-sm mt-1">
            Configure financial bursaries and review applications submitted by students.
          </p>
        </div>

        {/* Tab Toggle buttons */}
        <div className="flex bg-slate-100/80 border border-slate-200 p-1 rounded-xl shrink-0 self-start md:self-auto">
          <button
            onClick={() => setActiveTab("programs")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition ${
              activeTab === "programs"
                ? "bg-white text-blue-600 border border-slate-200 shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Bursary Packages</span>
          </button>
          <button
            onClick={() => setActiveTab("applications")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition ${
              activeTab === "applications"
                ? "bg-white text-blue-600 border border-slate-200 shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Student Applications</span>
          </button>
        </div>
      </div>

      {/* Program Creation Form Modal-style (Toggled) */}
      {activeTab === "programs" && showForm && (
        <form onSubmit={handleCreateProgram} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 animate-fadeIn">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="text-lg font-bold text-slate-800">Create New Bursary Package</h3>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="text-slate-400 hover:text-slate-650"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Bursary Name
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-250 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600 outline-none transition text-sm"
                placeholder="e.g., SCISA Welfare Needs Bursary"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Financial Amount / Value
              </label>
              <input
                type="text"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-250 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600 outline-none transition text-sm"
                placeholder="e.g., GHS 1,500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Description & Requirements
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-250 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600 outline-none transition text-sm"
              placeholder="e.g., Available to Level 200-400 students in financial need. Required CGPA: 2.50+..."
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Application Deadline
            </label>
            <input
              type="date"
              required
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full md:max-w-xs px-4 py-2.5 bg-slate-50 border border-slate-250 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600 outline-none transition text-sm"
            />
          </div>

          <div className="flex gap-3 justify-end pt-3 border-t border-slate-100 bg-white">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-bold transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saveLoading}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition flex items-center space-x-1.5 shadow-sm shadow-blue-500/10"
            >
              {saveLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Publish Bursary</span>}
            </button>
          </div>
        </form>
      )}

      {/* Programs List */}
      {activeTab === "programs" && !showForm && (
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-white px-6 py-4 border border-slate-200 rounded-2xl shadow-sm">
            <span className="text-sm font-bold text-slate-700">Active Packages ({bursaries.length})</span>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center space-x-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create New Program</span>
            </button>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-3">
              <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
              <p className="text-slate-500 font-medium">Fetching bursaries...</p>
            </div>
          ) : bursaries.length === 0 ? (
            <div className="flex flex-col items-center justify-center border border-dashed border-slate-350 rounded-3xl p-16 text-center bg-white">
              <Award className="w-10 h-10 text-slate-400 mb-3" />
              <h3 className="text-lg font-bold text-slate-800 mb-1">No Bursaries Published</h3>
              <p className="text-slate-500 text-sm max-w-sm">
                Publish bursary opportunities so eligible students can apply through the mobile application.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bursaries.map((b) => (
                <div
                  key={b.id}
                  className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between shadow-sm relative"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-slate-800 leading-tight">{b.title}</h3>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider mt-2 border ${
                          b.status === "open"
                            ? "bg-emerald-50 text-emerald-600 border-emerald-250"
                            : "bg-rose-50 text-rose-600 border-rose-250"
                        }`}>
                          {b.status}
                        </span>
                      </div>
                      <span className="text-blue-600 font-extrabold text-lg flex items-center bg-blue-50/50 px-3 py-1 rounded-xl border border-blue-100">
                        <DollarSign className="w-4 h-4 mr-0.5" />
                        {b.amount}
                      </span>
                    </div>

                    <p className="text-slate-650 text-sm leading-relaxed whitespace-pre-line">
                      {b.description}
                    </p>

                    <div className="flex items-center space-x-2 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span className="font-bold text-slate-500">Apply Before:</span>
                      <span>{new Date(b.deadline).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end space-x-2 pt-4 border-t border-slate-100 mt-4 bg-white">
                    <button
                      onClick={() => handleToggleStatus(b.id, b.status)}
                      className="px-3.5 py-1.5 bg-white hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold border border-slate-200 transition"
                    >
                      {b.status === "open" ? "Close Applications" : "Re-open Package"}
                    </button>
                    <button
                      onClick={() => handleDeleteProgram(b.id)}
                      className="p-2 bg-white hover:bg-rose-50 text-slate-500 hover:text-rose-600 border border-slate-200 hover:border-rose-100 rounded-xl transition"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Applications List */}
      {activeTab === "applications" && (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-3">
              <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
              <p className="text-slate-500 font-medium">Fetching applications...</p>
            </div>
          ) : applications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center px-6">
              <Users className="w-10 h-10 text-slate-400 mb-3" />
              <h3 className="text-lg font-bold text-slate-800 mb-1">No Applications Yet</h3>
              <p className="text-slate-500 text-sm max-w-sm">
                Student submissions will appear here once applications are filed through the mobile app.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto bg-white">
              <table className="w-full text-left border-collapse text-sm bg-white">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-600 font-bold uppercase tracking-wider text-xs">
                    <th className="px-6 py-4">Student</th>
                    <th className="px-6 py-4">Bursary Package</th>
                    <th className="px-6 py-4 text-center">CGPA</th>
                    <th className="px-6 py-4">Date Applied</th>
                    <th className="px-6 py-4 text-center">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 bg-white">
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-800">{app.student_name}</div>
                        <div className="text-xs text-slate-500">{app.student_id} • {app.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium truncate max-w-[200px]" title={app.bursaries?.title}>
                          {app.bursaries?.title || "Bursary Program"}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2 py-0.5 rounded-md text-xs font-bold ${
                          app.gpa >= 3.6 
                            ? "bg-blue-50 text-blue-600 border border-blue-200" 
                            : "bg-slate-50 text-slate-700 border border-slate-200"
                        }`}>
                          {Number(app.gpa).toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500 text-xs">
                        {new Date(app.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold capitalize ${
                          app.status === "approved"
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-150"
                            : app.status === "rejected"
                            ? "bg-rose-50 text-rose-600 border border-rose-150"
                            : "bg-amber-50 text-amber-600 border border-amber-150"
                        }`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => setSelectedApp(app)}
                          className="px-3.5 py-1.5 bg-white hover:bg-blue-50 text-blue-600 font-bold text-xs rounded-xl border border-slate-200 hover:border-blue-100 transition flex items-center space-x-1 ml-auto"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Detail</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Detail view Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl shadow-xl overflow-hidden animate-fadeIn">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-150 bg-slate-50/70">
              <div>
                <h3 className="text-lg font-bold text-slate-800">Application Review</h3>
                <p className="text-xs text-slate-500 mt-1">{selectedApp.bursaries?.title || "SCISA Bursary Program"}</p>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="text-slate-400 hover:text-slate-650 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto bg-white">
              {/* Applicant Profile */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 border border-slate-150 rounded-xl">
                <div>
                  <label className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Applicant Name</label>
                  <p className="text-sm font-bold text-slate-800">{selectedApp.student_name}</p>
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Student ID Number</label>
                  <p className="text-sm font-bold text-slate-800">{selectedApp.student_id}</p>
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Academic CGPA</label>
                  <p className="text-sm font-bold text-slate-800">{Number(selectedApp.gpa).toFixed(2)}</p>
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Email Address</label>
                  <p className="text-sm font-bold text-slate-800">{selectedApp.email}</p>
                </div>
              </div>

              {/* Statement of Need */}
              <div>
                <label className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-2">Statement of Need / Justification</label>
                <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl text-sm leading-relaxed text-slate-600 whitespace-pre-line">
                  {selectedApp.details}
                </div>
              </div>

              {/* Attached Essay Document */}
              {selectedApp.document_url && (
                <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-150">
                  <div className="flex items-center space-x-3">
                    <div className="bg-rose-50 p-2.5 rounded-lg border border-rose-100 text-rose-600">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">Justification Essay</h4>
                      <p className="text-xs text-slate-500">PDF / Proof of eligibility document</p>
                    </div>
                  </div>
                  <a
                    href={selectedApp.document_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-blue-600 hover:text-blue-700 rounded-lg text-xs font-bold border border-slate-200 transition"
                  >
                    <span>Open Essay</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>

            {/* Footer Status actions */}
            <div className="p-6 border-t border-slate-150 bg-slate-50/70 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500">Current status:</span>
                <span className="ml-2 text-sm font-bold text-blue-600 uppercase tracking-wide">{selectedApp.status}</span>
              </div>

              {selectedApp.status === "pending" ? (
                <div className="flex gap-2 bg-transparent">
                  <button
                    onClick={() => handleUpdateAppStatus(selectedApp.id, "rejected")}
                    className="flex items-center space-x-1.5 px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl text-xs font-bold border border-rose-200 transition"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Reject Application</span>
                  </button>
                  <button
                    onClick={() => handleUpdateAppStatus(selectedApp.id, "approved")}
                    className="flex items-center space-x-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-sm shadow-blue-500/10"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Approve Application</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSelectedApp(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
                >
                  Close Review
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
