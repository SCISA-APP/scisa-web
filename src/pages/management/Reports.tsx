import { useState, useEffect } from "react";
import { fetchConcerns, updateConcernStatus } from "../../api/concern";
import type { Concern } from "../../api/concern";
import { 
  AlertTriangle, 
  Eye, 
  CheckCircle2, 
  Hourglass, 
  Loader2, 
  X, 
  EyeOff, 
  UserCheck
} from "lucide-react";

export default function Reports() {
  const [concerns, setConcerns] = useState<Concern[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedConcern, setSelectedConcern] = useState<Concern | null>(null);
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const loadConcerns = async () => {
    setLoading(true);
    try {
      const data = await fetchConcerns();
      setConcerns(data);
    } catch (error) {
      console.error("Error fetching concerns:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConcerns();
  }, []);

  const handleUpdateStatus = async (id: number, status: "pending" | "investigating" | "resolved") => {
    setUpdatingStatus(true);
    try {
      await updateConcernStatus(id, status);
      if (selectedConcern && selectedConcern.id === id) {
        setSelectedConcern({ ...selectedConcern, status });
      }
      loadConcerns();
    } catch (error) {
      console.error("Error updating concern status:", error);
      alert("Failed to update status.");
    } finally {
      setUpdatingStatus(false);
    }
  };

  const categories = ["all", ...new Set(concerns.map((c) => c.category))];

  const filteredConcerns = concerns.filter((c) => {
    const matchesCategory = filterCategory === "all" || c.category === filterCategory;
    const matchesStatus = filterStatus === "all" || c.status === filterStatus;
    return matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Reported Concerns</h1>
          <p className="text-slate-500 text-sm mt-1">
            Track, review, and investigate welfare concerns submitted by students. Supporting confidential or anonymous reports.
          </p>
        </div>

        {/* Filters bar */}
        <div className="flex flex-wrap gap-2 shrink-0">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-700 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
          >
            <option value="all">All Categories</option>
            {categories.filter(cat => cat !== "all").map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-700 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="investigating">Investigating</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Concerns Listing Card */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            <p className="text-slate-500 font-medium">Fetching welfare reports...</p>
          </div>
        ) : filteredConcerns.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center px-6 bg-white">
            <AlertTriangle className="w-12 h-12 text-slate-400 mb-3" />
            <h3 className="text-lg font-bold text-slate-800 mb-1">No Concerns Logged</h3>
            <p className="text-slate-500 text-sm max-w-sm">
              We couldn't find any student concern reports matching the current filters.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white">
            <table className="w-full text-left border-collapse text-sm bg-white">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-600 font-bold uppercase tracking-wider text-xs">
                  <th className="px-6 py-4">Title Summary</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4 text-center">Identity</th>
                  <th className="px-6 py-4">Logged Date</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 bg-white">
                {filteredConcerns.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-800 truncate max-w-[280px]" title={c.title}>
                        {c.title}
                      </div>
                      <div className="text-xs text-slate-500 line-clamp-1 truncate max-w-[280px] mt-0.5" title={c.description}>
                        {c.description}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-slate-50 border border-slate-200 text-slate-700 rounded-lg text-xs font-medium">
                        {c.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {c.is_anonymous ? (
                        <span className="inline-flex items-center space-x-1 text-rose-600 text-xs font-bold">
                          <EyeOff className="w-3.5 h-3.5" />
                          <span>Anonymous</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 text-blue-600 text-xs font-bold">
                          <UserCheck className="w-3.5 h-3.5" />
                          <span>Identified</span>
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500">
                      {new Date(c.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold capitalize ${
                        c.status === "resolved"
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-150"
                          : c.status === "investigating"
                          ? "bg-blue-50 text-blue-600 border border-blue-150"
                          : "bg-rose-50 text-rose-600 border border-rose-150"
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelectedConcern(c)}
                        className="px-3.5 py-1.5 bg-white hover:bg-slate-50 text-blue-600 font-bold text-xs rounded-xl border border-slate-200 hover:border-blue-100 transition flex items-center space-x-1 ml-auto"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Concern Detail Review Modal */}
      {selectedConcern && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-xl shadow-xl overflow-hidden animate-fadeIn">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-150 bg-slate-50/70">
              <div className="flex items-center space-x-2.5 bg-transparent">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
                <h3 className="text-lg font-bold text-slate-800">Concern Inspection</h3>
              </div>
              <button
                onClick={() => setSelectedConcern(null)}
                className="text-slate-400 hover:text-slate-650 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6 bg-white">
              {/* Profile Details */}
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 border border-slate-150 rounded-xl text-xs">
                <div>
                  <span className="text-slate-400 block mb-0.5">Report Category</span>
                  <span className="font-bold text-slate-800 text-sm">{selectedConcern.category}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Reporter Identity</span>
                  <span className={`font-bold text-sm ${selectedConcern.is_anonymous ? "text-rose-600" : "text-blue-600"}`}>
                    {selectedConcern.is_anonymous ? "Anonymous Submission" : "Standard Student ID"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Date Submitted</span>
                  <span className="font-bold text-slate-800">{new Date(selectedConcern.created_at).toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Case Status</span>
                  <span className="font-bold text-blue-600 uppercase tracking-wide">{selectedConcern.status}</span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Title Summary</label>
                  <p className="text-sm font-bold text-slate-800">{selectedConcern.title}</p>
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-2">Detailed Report Description</label>
                  <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl text-sm leading-relaxed text-slate-650 whitespace-pre-line">
                    {selectedConcern.description}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="p-6 border-t border-slate-150 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <span className="text-xs text-slate-500">Update Action Pipeline:</span>
              
              <div className="flex gap-2 bg-transparent">
                {selectedConcern.status !== "pending" && (
                  <button
                    disabled={updatingStatus}
                    onClick={() => handleUpdateStatus(selectedConcern.id, "pending")}
                    className="flex items-center space-x-1 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold rounded-xl border border-rose-200 transition"
                  >
                    <Hourglass className="w-3.5 h-3.5" />
                    <span>Set Pending</span>
                  </button>
                )}
                
                {selectedConcern.status !== "investigating" && (
                  <button
                    disabled={updatingStatus}
                    onClick={() => handleUpdateStatus(selectedConcern.id, "investigating")}
                    className="flex items-center space-x-1 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-bold rounded-xl border border-blue-200 transition"
                  >
                    <Hourglass className="w-3.5 h-3.5" />
                    <span>Investigate</span>
                  </button>
                )}

                {selectedConcern.status !== "resolved" && (
                  <button
                    disabled={updatingStatus}
                    onClick={() => handleUpdateStatus(selectedConcern.id, "resolved")}
                    className="flex items-center space-x-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow-sm shadow-blue-500/10"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mark Resolved</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}