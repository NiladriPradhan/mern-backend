import { Outlet } from "react-router-dom";
import ShoppingHeader from "./ShoppingHeader";

const ShoppingLayout = () => {
  return (
    <>
      <div className="flex flex-col">
        {/* shopping header */}
        <ShoppingHeader />
        {/* main */}
        <main className="flex flex-col w-full">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default ShoppingLayout;
