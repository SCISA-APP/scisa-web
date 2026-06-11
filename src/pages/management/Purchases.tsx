import { useState, useEffect } from "react";
import { fetchPurchases } from "../../api/purchase";
import type { Purchase } from "../../api/purchase";
import { 
  ShoppingBag, 
  DollarSign, 
  RefreshCw, 
  TrendingUp, 
  Loader2, 
  Search
} from "lucide-react";

export default function Purchases() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "pending" | "refunded">("all");

  const loadPurchases = async () => {
    setLoading(true);
    try {
      const data = await fetchPurchases();
      setPurchases(data);
    } catch (error) {
      console.error("Error loading purchases:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPurchases();
  }, []);

  const metrics = purchases.reduce(
    (acc, p) => {
      if (p.status === "completed") {
        acc.revenue += Number(p.amount);
        acc.completedCount += 1;
      } else if (p.status === "refunded") {
        acc.refundedCount += 1;
      }
      return acc;
    },
    { revenue: 0, completedCount: 0, refundedCount: 0 }
  );

  const averageValue = metrics.completedCount > 0 ? metrics.revenue / metrics.completedCount : 0;

  const filteredPurchases = purchases.filter((p) => {
    const matchesSearch = p.buyer_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.item_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || p.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Purchase Transactions</h1>
        <p className="text-slate-500 text-sm mt-1">
          Monitor and track bookstore transactions, apparel sales, and merchandise tickets purchased in the mobile app.
        </p>
      </div>

      {/* Sales KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Revenue */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Revenue</span>
            <p className="text-2xl font-extrabold text-slate-800">GHS {metrics.revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
          <div className="w-11 h-11 bg-blue-50/50 border border-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        {/* Total Transactions */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Completed Orders</span>
            <p className="text-2xl font-extrabold text-slate-800">{metrics.completedCount}</p>
          </div>
          <div className="w-11 h-11 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
            <ShoppingBag className="w-5 h-5" />
          </div>
        </div>

        {/* Average Ticket Size */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Avg Order Value</span>
            <p className="text-2xl font-extrabold text-slate-800">GHS {averageValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
          <div className="w-11 h-11 bg-sky-50 border border-sky-100 text-sky-600 rounded-xl flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        {/* Refunded Tickets */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Refunds Count</span>
            <p className="text-2xl font-extrabold text-slate-800">{metrics.refundedCount}</p>
          </div>
          <div className="w-11 h-11 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl flex items-center justify-center shrink-0">
            <RefreshCw className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter and Search controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 border border-slate-200 rounded-2xl shadow-sm">
        <div className="relative w-full md:max-w-xs">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none text-sm transition"
          />
        </div>

        <div className="flex bg-slate-100/80 border border-slate-200 p-1 rounded-xl w-full md:w-auto overflow-x-auto">
          {(["all", "completed", "pending", "refunded"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1 rounded-lg text-xs font-bold capitalize transition ${
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

      {/* Purchases Listing Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            <p className="text-slate-500 font-medium">Fetching orders list...</p>
          </div>
        ) : filteredPurchases.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center px-6 bg-white">
            <ShoppingBag className="w-12 h-12 text-slate-400 mb-3" />
            <h3 className="text-lg font-bold text-slate-800 mb-1">No Orders Logged</h3>
            <p className="text-slate-500 text-sm max-w-sm">
              We couldn't find any transaction log matches for your search.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white">
            <table className="w-full text-left border-collapse text-sm bg-white">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-600 font-bold uppercase tracking-wider text-xs">
                  <th className="px-6 py-4">Transaction ID</th>
                  <th className="px-6 py-4">Buyer Name</th>
                  <th className="px-6 py-4">Item Name</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Transaction Date</th>
                  <th className="px-6 py-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 bg-white">
                {filteredPurchases.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-slate-400 font-bold font-mono text-xs">
                      #TXN-{String(p.id).padStart(5, "0")}
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-850">
                      {p.buyer_name}
                    </td>
                    <td className="px-6 py-4 font-bold text-blue-600">
                      {p.item_name}
                    </td>
                    <td className="px-6 py-4 text-slate-800 font-extrabold">
                      GHS {Number(p.amount).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500">
                      {new Date(p.created_at).toLocaleString(undefined, {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold capitalize ${
                        p.status === "completed"
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-150"
                          : p.status === "refunded"
                          ? "bg-rose-50 text-rose-600 border border-rose-150"
                          : "bg-amber-50 text-amber-600 border border-amber-150"
                      }`}>
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}