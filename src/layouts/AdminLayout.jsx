
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../admin/Sidebar";
import TopBar from "../admin/Topbar";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-slate-50">

      {/* Fixed Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Dashboard */}
      <div className="flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden">

        {/* Fixed Topbar */}
        <div className="shrink-0">
          <TopBar setSidebarOpen={setSidebarOpen} />
        </div>

        {/* Scrollable Page Content */}
        <main className="min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;
