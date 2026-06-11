import { useState, useEffect } from "react";
import { 
  fetchCounselors, 
  addCounselor, 
  updateCounselor, 
  deleteCounselor, 
  uploadCounselorImage
} from "../../api/counselor";
import type { Counselor } from "../../api/counselor";
import { Plus, Edit, Trash2, Phone, Calendar, Loader2, User, X, Camera } from "lucide-react";

export default function Counselors() {
  const [counselors, setCounselors] = useState<Counselor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentCounselor, setCurrentCounselor] = useState<Counselor | null>(null);
  
  // Form state
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [availability, setAvailability] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);

  const loadCounselors = async () => {
    setLoading(true);
    try {
      const data = await fetchCounselors();
      setCounselors(data);
    } catch (error) {
      console.error("Error fetching counselors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCounselors();
  }, []);

  const handleOpenAdd = () => {
    setCurrentCounselor(null);
    setName("");
    setRole("");
    setPhone("");
    setAvailability("");
    setImageFile(null);
    setImageUrl("");
    setShowModal(true);
  };

  const handleOpenEdit = (c: Counselor) => {
    setCurrentCounselor(c);
    setName(c.name);
    setRole(c.role);
    setPhone(c.phone);
    setAvailability(c.availability);
    setImageFile(null);
    setImageUrl(c.image || "");
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to remove this counselor?")) return;
    try {
      await deleteCounselor(id);
      loadCounselors();
    } catch (error) {
      console.error("Error deleting counselor:", error);
      alert("Failed to delete counselor.");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveLoading(true);

    try {
      let finalImageUrl = imageUrl;
      if (imageFile) {
        finalImageUrl = await uploadCounselorImage(imageFile);
      }

      const payload = {
        name,
        role,
        phone,
        availability,
        image: finalImageUrl || "",
      };

      if (currentCounselor) {
        await updateCounselor(currentCounselor.id, payload);
      } else {
        await addCounselor(payload);
      }

      setShowModal(false);
      loadCounselors();
    } catch (error) {
      console.error("Error saving counselor:", error);
      alert("Failed to save counselor details.");
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Student Counselors</h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage student counselors featured in the mental health support section of the mobile app.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center justify-center space-x-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition shadow-md shadow-blue-500/10 shrink-0 text-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Counselor</span>
        </button>
      </div>

      {/* Counselor Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-3">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
          <p className="text-slate-500 font-medium">Fetching counselors list...</p>
        </div>
      ) : counselors.length === 0 ? (
        <div className="flex flex-col items-center justify-center border border-dashed border-slate-350 rounded-3xl p-16 text-center bg-white">
          <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200 mb-4 text-slate-400">
            <User className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">No Counselors Found</h3>
          <p className="text-slate-500 text-sm max-w-sm">
            Add counselor contacts to show up on the welfare screen of the mobile app.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {counselors.map((c) => (
            <div
              key={c.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between shadow-sm relative group"
            >
              <div className="space-y-4">
                {/* Counselor Avatar & Info */}
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-slate-100 overflow-hidden flex items-center justify-center shrink-0">
                    {c.image ? (
                      <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-8 h-8 text-blue-400" />
                    )}
                  </div>
                  <div className="truncate">
                    <h3 className="text-base font-bold text-slate-850 truncate">{c.name}</h3>
                    <p className="text-xs text-blue-600 font-bold truncate mt-0.5">{c.role}</p>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 bg-slate-50 p-3.5 border border-slate-100 rounded-xl text-xs text-slate-700">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="font-bold text-slate-500 shrink-0">Phone:</span>
                    <span className="truncate">{c.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="font-bold text-slate-500 shrink-0">Availability:</span>
                    <span className="truncate">{c.availability}</span>
                  </div>
                </div>
              </div>

              {/* Edit/Delete Actions */}
              <div className="flex items-center justify-end space-x-2 pt-4 border-t border-slate-100 mt-4 bg-white">
                <button
                  onClick={() => handleOpenEdit(c)}
                  className="p-2 bg-white hover:bg-blue-50 text-slate-500 hover:text-blue-600 border border-slate-200 hover:border-blue-100 rounded-xl transition"
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="p-2 bg-white hover:bg-rose-50 text-slate-500 hover:text-rose-650 border border-slate-200 hover:border-rose-100 rounded-xl transition"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Backdrop */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg shadow-xl overflow-hidden animate-fadeIn">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-150">
              <h3 className="text-lg font-bold text-slate-800">
                {currentCounselor ? "Edit Counselor Details" : "Add Student Counselor"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-650 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} className="p-6 space-y-4 bg-white">
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Counselor Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-250 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600 outline-none transition"
                  placeholder="e.g., Prof. Sarah Jenkins"
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Role / Affiliation
                </label>
                <input
                  type="text"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-250 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600 outline-none transition"
                  placeholder="e.g., Faculty Counsellor / Welfare Officer"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Phone Contact
                  </label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-250 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600 outline-none transition"
                    placeholder="e.g., +233 24 123 4567"
                  />
                </div>

                {/* Availability */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Availability hours
                  </label>
                  <input
                    type="text"
                    required
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-250 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600 outline-none transition"
                    placeholder="e.g., Mon - Fri, 8 AM - 4 PM"
                  />
                </div>
              </div>

              {/* Avatar Upload */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Profile Picture
                </label>
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-250 overflow-hidden flex items-center justify-center shrink-0">
                    {imageFile ? (
                      <img src={URL.createObjectURL(imageFile)} alt="Preview" className="w-full h-full object-cover" />
                    ) : imageUrl ? (
                      <img src={imageUrl} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-6 h-6 text-slate-400" />
                    )}
                  </div>
                  <label className="flex items-center space-x-2 px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-250 rounded-xl cursor-pointer transition text-xs font-bold">
                    <Camera className="w-3.5 h-3.5 text-blue-600" />
                    <span>Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    />
                  </label>
                  {(imageFile || imageUrl) && (
                    <button
                      type="button"
                      onClick={() => { setImageFile(null); setImageUrl(""); }}
                      className="text-xs text-rose-600 hover:text-rose-700 font-bold"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100 mt-6 bg-white">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-bold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saveLoading}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition flex items-center space-x-1.5"
                >
                  {saveLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Save Changes</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}