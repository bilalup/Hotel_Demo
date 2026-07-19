import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/admin/Sidebar";

export function AdminLayout() {
  return (
    <div className="flex bg-warm-white">
      <Sidebar />
      <main className="min-h-screen flex-1 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}
