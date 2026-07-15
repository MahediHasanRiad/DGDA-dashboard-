import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Eye, EyeOff, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import { logedInUser } from "./redux/auth.slice";
import { toast } from "sonner";
import { useLoginMutation } from "./redux/login.redux";

interface LoginFormType {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginFormType) => {
    try {
      // 1. Trigger mutation and unwrap the promise to catch errors cleanly
      const response = await login(data).unwrap();
      
      // 2. Dispatch data to your auth slice
      dispatch(logedInUser(response));
      
      // 3. Save tokens safely in localStorage
      if (response?.data?.accessToken && response?.data?.refreshToken) {
        localStorage.setItem("access-token", response.data.accessToken);
        localStorage.setItem("refresh-token", response.data.refreshToken);
      }

      // 4. Handle role-based redirection
      const role = response?.data?.user?.role;
      if (role === "SUPER_ADMIN") {
        navigate("/");
      } else if (role === "CUSTOMER") {
        navigate("/my-site");
      } else {
        // Fallback route if role doesn't match predefined options
        navigate("/");
      }

      toast.success("Welcome back!");
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50/50">
      <div className="flex flex-col justify-center items-center px-8 sm:px-16 lg:px-20 bg-white py-12 rounded-xl shadow-sm border border-slate-100 max-w-md w-full mx-auto">
        {/* Mobile logo */}
        <div className="flex items-center gap-2 mb-8">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: "#0f1f3d" }}
          >
            <Shield className="w-4 h-4 text-white" strokeWidth={2} />
          </div>
          <span className="font-bold text-slate-800 tracking-tight text-lg">
            WACHiO
          </span>
        </div>

        <div className="w-full">
          {/* Heading */}
          <div className="mb-8 text-center sm:text-left">
            <h2
              className="text-3xl font-black text-slate-900 mb-1.5"
              style={{ letterSpacing: "-0.02em" }}
            >
              Welcome back
            </h2>
            <p className="text-sm text-slate-400">
              Sign in to access your command center.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-[13px] font-semibold text-slate-600">
                Email address
              </Label>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Enter a valid email",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="email"
                    placeholder="admin@WACHiO.com"
                    disabled={isLoading}
                    className={`h-11 text-sm ${errors.email ? "border-red-400 focus-visible:ring-red-200" : ""}`}
                  />
                )}
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-[13px] font-semibold text-slate-600">
                  Password
                </Label>
              </div>
              <Controller
                name="password"
                control={control}
                rules={{ required: "Password is required" }}
                render={({ field }) => (
                  <div className="relative">
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••••••"
                      disabled={isLoading}
                      className={`h-11 text-sm pr-10 ${errors.password ? "border-red-400 focus-visible:ring-red-200" : ""}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      disabled={isLoading}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                )}
              />
              {errors.password && (
                <p className="text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="h-11 text-sm text-white font-semibold mt-1 w-full"
              style={{ backgroundColor: "#0f1f3d" }}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}