import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  username: "",
  email: "",
  password: "",
};

export function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialState);
  const [isShow, setIsShow] = useState(false);
  const togglePassword = useCallback(() => setIsShow((prev) => !prev), []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:4000/api/auth/register",
        formData,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/auth/login");
        setFormData({ username: "", email: "", password: "" });
      }
    } catch (error) {
      // 🔥 This runs when backend sends an error (status 500, 400, etc.)
      if (axios.isAxiosError(error)) {
        const errMsg = error.response?.data?.message || "Registration failed";
        toast.error(errMsg);
      } else {
        toast.error("Unexpected error occurred");
      }
    }
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   dispatch(registerUser(formData));
  //    navigate("/auth/login")
  //    toast.success("User registered successfully")

  //   console.log(formData);
  //   setFormData({
  //     username: "",
  //     email: "",
  //     password: "",
  //   });
  // };

  return (
    <>
      <div className="min-h-screen grid grid-cols-2 w-full">
        <div className="w-lg grid place-items-center mx-auto">
          <Card className="w-md">
            <CardHeader>
              <CardTitle className="text-2xl font-bold capitalize text-center mb-2">
                Create a new account
              </CardTitle>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="name">UserName</Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="john doe"
                      value={formData.username}
                      onChange={(e) =>
                        setFormData({ ...formData, username: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={isShow ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        required
                      />
                      <button
                        type="button"
                        onClick={togglePassword}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-sm"
                      >
                        {isShow ? (
                          <EyeOff className="text-gray-500" />
                        ) : (
                          <Eye className="text-gray-500" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <Button type="submit" className="w-full mt-4">
                  Register
                </Button>
              </form>
            </CardContent>

            <CardFooter className="flex-col gap-2">
              <Link to="/auth/login" className="text-blue-500 hover:underline">
                Already have an account
              </Link>
            </CardFooter>
          </Card>
        </div>
        <div className="bg-gray-950 flex justify-center items-center">
          <h1 className="text-center text-4xl text-white w-md">
            Welcome to Ecommerce Shopping{" "}
          </h1>
        </div>
      </div>
    </>
  );
}
