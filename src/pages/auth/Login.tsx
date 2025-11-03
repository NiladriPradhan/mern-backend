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
import { loginUser } from "@/redux/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Eye, EyeOff } from "lucide-react";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";

interface InitialState {
  email: string;
  password: string;
}

const initialState: InitialState = {
  email: "",
  password: "",
};

export function Login() {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState(initialState);

  const [isShow, setIsShow] = useState(false);
  const togglePassword = useCallback(() => setIsShow((prev) => !prev), []);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      console.log(data);
    });
    console.log(formData);
  };
  return (
    <>
      <div className="min-h-screen grid grid-cols-2 w-full">
        <div className="bg-gray-950 flex justify-center items-center">
          <h1 className="text-center text-4xl text-white w-md">
            Welcome to Ecommerce Shopping{" "}
          </h1>
        </div>
        <div className="w-lg grid place-items-center mx-auto">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-3xl font-semibold text-center">
                Login{" "}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
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
                      <a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </a>
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
                  Login
                </Button>
              </form>
            </CardContent>

            <CardFooter className="flex-col gap-2">
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
              <Link
                to={"/auth/register"}
                className="text-blue-500 hover:underline"
              >
                I Don't have an account?{" "}
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
