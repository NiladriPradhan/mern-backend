import { BadgeCheck, LayoutDashboard, ShoppingBasket } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Sheet, SheetContent } from "@/components/ui/sheet";

const routes = [
  { name: "Dashboard", link: "/admin/dashboard", icon: <LayoutDashboard /> },
  { name: "Products", link: "/admin/products", icon: <ShoppingBasket /> },
  { name: "Orders", link: "/admin/orders", icon: <BadgeCheck /> },
];

interface AdminSidebarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ open, setOpen }) => {
  return (
    <>
      {/* Sidebar visible on lg screens */}
      <div className="hidden lg:flex flex-col w-64 min-h-screen border-r bg-white p-4">
        <h2 className="text-xl font-semibold mb-6">Admin Panel</h2>
        <div className="flex flex-col gap-2">
          {routes.map((route) => (
            <NavLink
              key={route.name}
              to={route.link}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-gray-100 ${
                  isActive ? "bg-gray-200" : ""
                }`
              }
            >
              {route.icon}
              <span>{route.name}</span>
            </NavLink>
          ))}
        </div>
      </div>

      {/* Sheet sidebar for small screens */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="p-4 w-64">
          <h2 className="text-xl font-semibold mb-6">Admin Panel</h2>
          <div className="flex flex-col gap-2">
            {routes.map((route) => (
              <NavLink
                key={route.name}
                to={route.link}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-gray-100 ${
                    isActive ? "bg-gray-200" : ""
                  }`
                }
                onClick={() => setOpen(false)} // close on link click
              >
                {route.icon}
                <span>{route.name}</span>
              </NavLink>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AdminSidebar;
