import { logoutUser } from "@/redux/authSlice";
import { AlignJustify, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/redux/hooks";

interface AdminHeaderProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ setOpen }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser()).then(() => {
      navigate("/auth/login");
    });
  };
  return (
    <div className="shadow-md w-full py-4 px-4 pl-4 items-center flex justify-between">
      <Button
        className="lg:hidden sm:block"
        onClick={()=>setOpen(true)}
      >
        <AlignJustify />
      </Button>
      <button
        onClick={handleLogout}
          className="bg-black text-white px-4 py-2 rounded flex items-center gap-2 ml-auto"
      >
        <LogOut />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default AdminHeader;
