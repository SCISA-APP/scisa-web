import { useState, useEffect } from "react";
import { fetchSellers, updateSellerStatus } from "../../api/seller";
import type { Seller } from "../../api/seller";
import { Store, Eye, Check, X, Loader2 } from "lucide-react";

export default function Sellers() {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "approved" | "rejected">("all");

  const loadSellers = async () => {
    setLoading(true);
    try {
      const data = await fetchSellers();
      setSellers(data);
    } catch (error) {
      console.error("Error loading sellers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSellers();
  }, []);

  const handleUpdateStatus = async (id: number, status: "approved" | "rejected") => {
    try {
      await updateSellerStatus(id, status);
      setSelectedSeller(null);
      loadSellers();
    } catch (error) {
      console.error("Error updating seller status:", error);
      alert("Failed to update seller status.");
    }
  };

  const filteredSellers = sellers.filter((s) => {
    return filterStatus === "all" || s.status === filterStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Applied Sellers</h1>
          <p className="text-slate-500 text-sm mt-1">
            Review and approve student merchant applications for the Student Store section of the mobile app.
          </p>
        </div>

        {/* Filter dropdown */}
        <div className="flex bg-slate-100/80 border border-slate-200 p-1 rounded-xl shrink-0">
          {(["all", "pending", "approved", "rejected"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition ${
                filterStatus === status
                  ? "bg-white text-blue-600 border border-slate-200 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Sellers List Card */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            <p className="text-slate-500 font-medium">Fetching applications list...</p>
          </div>
        ) : filteredSellers.length === 0 ? (
          <div className="flex flex-col items-center justify-center border-t border-slate-100 py-16 text-center px-6 bg-white">
            <Store className="w-12 h-12 text-slate-400 mb-3" />
            <h3 className="text-lg font-bold text-slate-800 mb-1">No Applications Found</h3>
            <p className="text-slate-500 text-sm max-w-sm">
              {filterStatus === "all"
                ? "No merchants have applied to sell on the store yet."
                : `There are currently no merchants matching the '${filterStatus}' status.`}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white">
            <table className="w-full text-left border-collapse text-sm bg-white">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-600 font-bold uppercase tracking-wider text-xs">
                  <th className="px-6 py-4">Student Info</th>
                  <th className="px-6 py-4">Store Name</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4">Applied Date</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 bg-white">
                {filteredSellers.map((seller) => (
                  <tr key={seller.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-850">{seller.full_name}</div>
                      <div className="text-xs text-slate-500">{seller.student_id} • {seller.email}</div>
                    </td>
                    <td className="px-6 py-4 font-bold text-blue-600">
                      {seller.store_name}
                    </td>
                    <td className="px-6 py-4 max-w-[240px] truncate text-slate-600">
                      {seller.description}
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500">
                      {new Date(seller.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold capitalize ${
                        seller.status === "approved"
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-150"
                          : seller.status === "rejected"
                          ? "bg-rose-50 text-rose-600 border border-rose-150"
                          : "bg-amber-50 text-amber-600 border border-amber-150"
                      }`}>
                        {seller.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelectedSeller(seller)}
                        className="px-3.5 py-1.5 bg-white hover:bg-slate-50 text-blue-600 font-bold text-xs rounded-xl border border-slate-200 hover:border-blue-100 transition flex items-center space-x-1 ml-auto"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect Application</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Seller Inspection Detail Modal */}
      {selectedSeller && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-xl shadow-xl overflow-hidden animate-fadeIn">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-150 bg-slate-50/70">
              <div className="flex items-center space-x-2.5 bg-transparent">
                <Store className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-bold text-slate-800">Merchant Application</h3>
              </div>
              <button
                onClick={() => setSelectedSeller(null)}
                className="text-slate-400 hover:text-slate-650 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6 bg-white">
              {/* Profile details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 border border-slate-150 rounded-xl">
                <div>
                  <label className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Student Merchant</label>
                  <p className="text-sm font-bold text-slate-800">{selectedSeller.full_name}</p>
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Student ID</label>
                  <p className="text-sm font-bold text-slate-800">{selectedSeller.student_id}</p>
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Proposed Store Name</label>
                  <p className="text-sm text-blue-600 font-bold">{selectedSeller.store_name}</p>
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Email</label>
                  <p className="text-sm font-bold text-slate-800">{selectedSeller.email}</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-2">Business Pitch & Store Description</label>
                <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl text-sm leading-relaxed text-slate-650 whitespace-pre-line">
                  {selectedSeller.description}
                </div>
              </div>
            </div>

            {/* Footer action buttons */}
            <div className="p-6 border-t border-slate-150 bg-slate-50/70 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500">Current Status:</span>
                <span className="ml-2 text-sm font-bold text-blue-600 uppercase tracking-wide">{selectedSeller.status}</span>
              </div>

              {selectedSeller.status === "pending" ? (
                <div className="flex gap-2 bg-transparent">
                  <button
                    onClick={() => handleUpdateStatus(selectedSeller.id, "rejected")}
                    className="flex items-center space-x-1.5 px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl text-xs font-bold border border-rose-200 transition"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Decline Shop</span>
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedSeller.id, "approved")}
                    className="flex items-center space-x-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-sm shadow-blue-500/10"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Approve Shop</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSelectedSeller(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
                >
                  Close Detail
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}