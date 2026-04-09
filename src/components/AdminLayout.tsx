import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="ml-[280px] flex flex-1 flex-col">
        <Outlet />
      </div>
    </div>
  );
}
