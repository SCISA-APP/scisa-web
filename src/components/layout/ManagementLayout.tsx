import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "/logo.jpeg";
import { 
  FileText, 
  GraduationCap, 
  Store, 
  ShoppingBag, 
  Users, 
  AlertTriangle,
  LogOut,
  User as UserIcon
} from "lucide-react";

interface Props {
  children: React.ReactNode;
}

export default function ManagementLayout({ children }: Props) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Articles / Events", path: "/management/articles", icon: FileText },
    { name: "SCISA Bursary", path: "/management/bursary", icon: GraduationCap },
     { name: "Executive Display", path: "/management/executives", icon: FileText },
    { name: "Counselors", path: "/management/counselors", icon: Users },
    { name: "Reported Concerns", path: "/management/reports", icon: AlertTriangle },
        { name: "Applied Sellers", path: "/management/sellers", icon: Store },
    { name: "Purchases", path: "/management/purchases", icon: ShoppingBag },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-800 font-sans">
      {/* Sidebar - Sticky, no movement */}
      <aside className="w-72 h-full bg-white border-r border-slate-200/80 flex flex-col justify-between shrink-0 shadow-sm z-30">
        <div>
          {/* Logo & Header */}
          <div className="flex items-center space-x-3 p-6 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
              <img src={logo} alt="SCISA Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800 tracking-tight leading-tight">SCISA Portal</h2>
              <span className="text-xs text-blue-600 font-bold uppercase tracking-wider">Administrator</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                      isActive 
                        ? "bg-blue-50 text-blue-600 font-semibold border-l-4 border-blue-600 rounded-l-none" 
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                    }`
                  }
                >
                  <Icon className="w-5 h-5 shrink-0 transition-transform duration-200 group-hover:scale-105" />
                  <span className="text-sm">{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User Profile & Logout Section */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 max-w-[75%]">
              <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                <UserIcon className="w-4 h-4 text-blue-600" />
              </div>
              <div className="truncate">
                <p className="text-sm font-semibold text-slate-800 truncate leading-none mb-1">
                  {user?.name || "Admin"}
                </p>
                <p className="text-xs text-slate-500 truncate">
                  {user?.email || "admin@scisa.edu"}
                </p>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              title="Logout"
              className="p-2 rounded-xl bg-white hover:bg-rose-50 text-rose-600 hover:text-rose-700 transition-colors duration-200 border border-slate-200 hover:border-rose-100"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8 shrink-0 z-20">
          <h1 className="text-lg font-bold text-slate-800">
            SCISA College Admin Console
          </h1>
          <div className="flex items-center space-x-4">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
            </span>
            <span className="text-xs text-slate-500 font-semibold">Server Online</span>
          </div>
        </header>

        {/* Content Container - Scrollable Area */}
        <main className="flex-1 p-8 overflow-y-auto bg-slate-50">
          {children}
        </main>
      </div>
    </div>
  );
}
