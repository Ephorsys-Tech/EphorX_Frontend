
import {
  LayoutDashboard,
  Package,
  X,
  ShoppingBag,
  Users,
  Images,
  LogOut,
  Phone,
  Cast,
} from "lucide-react";

import logo from '../assets/Logolight.png'

import { NavLink } from "react-router-dom";
import { useState } from "react";
import LogoutModal from "./modals/LogoutModal";

const NAV_ITEMS = [
  {
    path: "/admin/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    path: "/admin/category",
    label: "Category",
    icon: Package,
  },
  {
    path: "/admin/course",
    label: "Courses",
    icon: Users,
  },
  {
    path: "/admin/contacts",
    label: "Contacts",
    icon: Phone,
  },
  {
    path: "/admin/trainers",
    label: "Trainers",
    icon: Users,
  },
  {
    path: "/admin/webinars",
    label: "Webinars",
    icon: Cast,
  },
  {
    path: "/admin/gallery",
    label: "Gallery",
    icon: Images,
  },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const handleCloseLogoutModal = () => {
    setLogoutModalOpen(false);
  };

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50
                    flex h-dvh w-64 flex-col
                  bg-slate-900 text-white
                    transition-transform duration-300
                    lg:sticky lg:top-0 lg:translate-x-0 lg:shrink-0
                   ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-1">
          <div className="flex items-center justify-center overflow-hidden rounded-xl">
            <img
              src={logo}
              alt="EPhorX Logo"
              className="h-15"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
          </div>

          {/* Mobile Close Button */}
          <button
            type="button"
            aria-label="Close sidebar"
            className="rounded-lg p-1.5 transition hover:bg-white/10 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="min-h-0 flex-1 space-y-1 overflow-y-hidden px-4 py-6">
          {NAV_ITEMS.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex w-full items-center gap-3 rounded-xl px-4 py-2.5
                text-sm font-medium transition-all
                ${isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                  : "text-slate-400 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Logout Button at Bottom */}
        <div className="mt-auto border-t border-white/10 p-4">
          <button
            type="button"
            onClick={() => setLogoutModalOpen(true)}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3
              text-sm font-medium text-red-400 transition-all
              hover:bg-red-500/10 hover:text-red-300"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Full-Screen Logout Modal */}
      {logoutModalOpen && (
        <LogoutModal onClose={handleCloseLogoutModal} />
      )}
    </>
  );
};

export default Sidebar;
