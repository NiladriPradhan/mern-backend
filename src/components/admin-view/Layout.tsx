import { Outlet } from "react-router-dom";
import AdminSidebar from "./Sidebar";
import AdminHeader from "./Header";
import { useState } from "react";

const AdminLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <>
      <div className="flex min-h-screen">
        {/* sidebar */}
        <AdminSidebar open={openSidebar} setOpen={setOpenSidebar} />
        <div className="flex w-full flex-1 flex-col">
          {/* header */}
          <AdminHeader setOpen={setOpenSidebar} />
          {/* main */}
          <div className="p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
