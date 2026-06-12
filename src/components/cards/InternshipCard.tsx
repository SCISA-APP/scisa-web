import type { Listing } from "../../types/Internship";
import { MapPin, Clock, Calendar, DollarSign, Pencil, Trash2, Building2 } from "lucide-react";

interface Props {
  listing: Listing;
  onEdit: () => void;
  onDelete: () => void;
}

const TYPE_COLORS: Record<string, string> = {
  Internship: "bg-blue-50 text-blue-700 border-blue-100",
  Job: "bg-green-50 text-green-700 border-green-100",
  NSS: "bg-purple-50 text-purple-700 border-purple-100",
};

export default function InternshipCard({ listing, onEdit, onDelete }: Props) {
  const deadlineDate = new Date(listing.deadline);
  const isExpired = deadlineDate < new Date();

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col">
      {/* Color strip */}
      <div className="h-1.5 w-full" style={{ backgroundColor: listing.tint }} />

      <div className="p-5 flex flex-col flex-1 gap-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {listing.logo ? (
              <img
                src={listing.logo}
                alt={`${listing.company} logo`}
                className="w-11 h-11 rounded-xl object-contain border border-slate-200 bg-white p-1 shrink-0"
              />
            ) : (
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: listing.tint + "20" }}
              >
                <Building2 className="w-5 h-5" style={{ color: listing.tint }} />
              </div>
            )}
            <div className="min-w-0">
              <h3 className="font-bold text-slate-800 text-sm leading-tight truncate">{listing.role}</h3>
              <p className="text-slate-500 text-xs mt-0.5 truncate">{listing.company}</p>
            </div>
          </div>
          <span
            className={`shrink-0 text-xs font-bold px-2.5 py-1 rounded-full border ${
              TYPE_COLORS[listing.type] || "bg-slate-100 text-slate-600 border-slate-200"
            }`}
          >
            {listing.type}
          </span>
        </div>

        {/* Meta */}
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
            <span className="truncate">{listing.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 shrink-0 text-slate-400" />
            <span className="truncate">{listing.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 shrink-0 text-slate-400" />
            <span className={isExpired ? "text-rose-500 font-semibold" : ""}>
              {isExpired ? "Expired" : `Due ${deadlineDate.toLocaleDateString()}`}
            </span>
          </div>
          {listing.stipend && (
            <div className="flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 shrink-0 text-slate-400" />
              <span className="truncate font-semibold text-slate-700">
                {listing.stipend.currency} {listing.stipend.amount.toLocaleString()}/{listing.stipend.period.slice(0, 2)}
              </span>
            </div>
          )}
        </div>

        {/* Department */}
        <div className="text-xs">
          <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-medium">
            {listing.department}
          </span>
        </div>

        {/* Skills */}
        {listing.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {listing.skills.slice(0, 4).map((skill) => (
              <span
                key={skill}
                className="text-xs px-2 py-0.5 rounded-full border border-slate-200 text-slate-600 bg-slate-50"
              >
                {skill}
              </span>
            ))}
            {listing.skills.length > 4 && (
              <span className="text-xs text-slate-400">+{listing.skills.length - 4} more</span>
            )}
          </div>
        )}

        {/* Footer: actions */}
        <div className="flex gap-2 pt-2 border-t border-slate-100 mt-auto">
          <button
            onClick={onEdit}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-blue-600 hover:bg-blue-50 rounded-xl transition border border-blue-100"
          >
            <Pencil className="w-3.5 h-3.5" />
            Edit
          </button>
          <button
            onClick={onDelete}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition border border-rose-100"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
