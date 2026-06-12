import { useState, useEffect } from "react";
import {
  fetchListings,
  addListing,
  updateListing,
  deleteListing,
  uploadListingLogo,
} from "../../api/internship";
import type { Listing } from "../../types/Internship";
import InternshipForm, { type InternshipFormValues } from "../../components/forms/InternshipForm";
import InternshipCard from "../../components/cards/InternshipCard";
import { Plus, Loader2, Search, Briefcase } from "lucide-react";
import type { ListingType } from "../../types/Internship";

type FilterType = "all" | ListingType;

export default function Internship() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Listing | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<FilterType>("all");

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchListings();
      setListings(data);
    } catch (err) {
      console.error("Error loading listings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (values: InternshipFormValues) => {
    let logoUrl = values.existingLogo || values.logo || "";
    if (values.logoFile) {
      logoUrl = await uploadListingLogo(values.logoFile);
    }

    const payload = {
      company: values.company,
      logo: logoUrl || undefined,
      location: values.location,
      role: values.role,
      department: values.department,
      type: values.type,
      stipend: values.stipend,
      duration: values.duration,
      deadline: values.deadline,
      description: values.description,
      skills: values.skills,
      contact: values.contact,
      tint: values.tint,
    };

    if (editing) {
      await updateListing(editing.id, payload, editing.logo);
    } else {
      await addListing(payload);
    }

    setShowForm(false);
    setEditing(null);
    load();
  };

  const handleEdit = (listing: Listing) => {
    setEditing(listing);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (listing: Listing) => {
    if (!window.confirm(`Delete "${listing.role}" at ${listing.company}?`)) return;
    try {
      await deleteListing(listing.id, listing.logo);
      load();
    } catch (err) {
      console.error(err);
      alert("Failed to delete listing.");
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditing(null);
  };

  const toFormValues = (l: Listing): InternshipFormValues => ({
    company: l.company,
    logo: l.logo ?? "",
    location: l.location,
    role: l.role,
    department: l.department,
    type: l.type,
    stipend: l.stipend,
    duration: l.duration,
    deadline: l.deadline,
    description: l.description,
    skills: l.skills,
    contact: l.contact,
    tint: l.tint,
    logoFile: null,
    existingLogo: l.logo ?? "",
  });

  const filtered = listings.filter((l) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      l.company.toLowerCase().includes(q) ||
      l.role.toLowerCase().includes(q) ||
      l.department.toLowerCase().includes(q) ||
      l.location.toLowerCase().includes(q);
    const matchesType = filterType === "all" || l.type === filterType;
    return matchesSearch && matchesType;
  });

  // Stats
  const internshipCount = listings.filter((l) => l.type === "Internship").length;
  const jobCount = listings.filter((l) => l.type === "Job").length;
  const nssCount = listings.filter((l) => l.type === "NSS").length;
  const activeCount = listings.filter((l) => new Date(l.deadline) >= new Date()).length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Internship & Job Listings</h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage internship, job, and NSS opportunities displayed on the mobile app.
          </p>
        </div>
        {!showForm && (
          <button
            onClick={() => { setEditing(null); setShowForm(true); }}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition shadow-md shadow-blue-500/10 text-sm shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Listing</span>
          </button>
        )}
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Listings", value: listings.length, color: "text-slate-800" },
          { label: "Active", value: activeCount, color: "text-green-600" },
          { label: "Internships", value: internshipCount, color: "text-blue-600" },
          { label: "NSS / Jobs", value: nssCount + jobCount, color: "text-purple-600" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide">{stat.label}</p>
            <p className={`text-3xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Form */}
      {showForm && (
        <InternshipForm
          initialValues={editing ? toFormValues(editing) : undefined}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          editing={editing}
        />
      )}

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 border border-slate-200 rounded-2xl shadow-sm">
        <div className="relative w-full md:max-w-xs">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search listings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none text-sm transition"
          />
        </div>

        <div className="flex bg-slate-100/80 border border-slate-200 p-1 rounded-xl w-full md:w-auto">
          {(["all", "Internship", "Job", "NSS"] as FilterType[]).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`flex-1 md:flex-initial px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                filterType === type
                  ? "bg-white text-blue-600 border border-slate-200 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {type === "all" ? "All" : type}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-3">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
          <p className="text-slate-500 font-medium">Loading listings...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center border border-dashed border-slate-300 rounded-3xl p-16 text-center bg-white">
          <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200 mb-4 text-slate-400">
            <Briefcase className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">No listings found</h3>
          <p className="text-slate-500 text-sm max-w-sm">
            {searchQuery
              ? "Try adjusting your search or filters."
              : "No listings added yet. Click 'Add Listing' to get started."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((listing) => (
            <InternshipCard
              key={listing.id}
              listing={listing}
              onEdit={() => handleEdit(listing)}
              onDelete={() => handleDelete(listing)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
