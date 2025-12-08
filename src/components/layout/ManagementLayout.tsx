// src/components/layout/ManagementLayout.tsx
import React from "react";
import { NavLink } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

export default function ManagementLayout({ children }: Props) {
  const menuItems = [
    { name: "Dashboard", path: "/management" },
    { name: "Articles", path: "/management/articles" },
    { name: "SCISA Bursary", path: "/management/bursary" },
    { name: "Applied Sellers", path: "/management/sellers" },
    { name: "Purchases", path: "/management/purchases" },
    { name: "Student Counselors", path: "/management/counselors" },
    { name: "Reports", path: "/management/reports" },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4 flex flex-col">
        <h2 className="text-xl font-bold mb-6">Management Dashboard</h2>
        <nav className="flex flex-col space-y-3">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `px-3 py-2 rounded hover:bg-blue-100 transition ${
                  isActive ? "bg-blue-200 font-semibold" : ""
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">{children}</main>
    </div>
  );
}
