import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../admin/Sidebar";
import TopBar from "../admin/Topbar";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

 
return (
  <div className="flex h-dvh overflow-hidden bg-slate-50">
    <Sidebar
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
    />

    <div className="flex h-dvh min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
      <TopBar setSidebarOpen={setSidebarOpen} />

      <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  </div>
)
};

export default AdminLayout;