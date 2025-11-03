import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex flex-col mx-auto bg-amber-50">
      {/* <h1 className=" text-center text-2xl font-semibold capitalize">Welcome to ecommerce shopping</h1> */}
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
