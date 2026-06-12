import { Mail, Phone, Pencil, Trash2, User } from "lucide-react";

interface Props {
  name: string;
  position: string;
  phone: string | null;
  email: string | null;
  description: string | null;
  image: string | null;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ExecutiveCard({
  name, position, phone, email, description, image, onEdit, onDelete,
}: Props) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col gap-3">
      <div className="flex items-center gap-3">
        {image ? (
          <img src={image} alt={name} className="w-14 h-14 rounded-full object-cover border border-slate-200" />
        ) : (
          <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
            <User className="w-6 h-6" />
          </div>
        )}
        <div className="flex-1">
          <p className="font-bold text-slate-800 text-sm">{name}</p>
          <p className="text-xs text-slate-500">{position}</p>
        </div>
      </div>

      {description && (
        <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">{description}</p>
      )}

      <div className="flex flex-col gap-1 text-xs text-slate-500">
        {phone && (
          <span className="flex items-center gap-1.5">
            <Phone className="w-3 h-3" /> {phone}
          </span>
        )}
        {email && (
          <span className="flex items-center gap-1.5">
            <Mail className="w-3 h-3" /> {email}
          </span>
        )}
      </div>

      <div className="flex gap-2 pt-2 border-t border-slate-100">
        <button
          onClick={onEdit}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition"
        >
          <Pencil className="w-3 h-3" /> Edit
        </button>
        <button
          onClick={onDelete}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg text-xs font-bold transition"
        >
          <Trash2 className="w-3 h-3" /> Delete
        </button>
      </div>
    </div>
  );
}