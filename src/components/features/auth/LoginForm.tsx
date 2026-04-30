"use client";
import AuthCard from "@/components/features/auth/AuthCard";
import { loginSchema, loginValues } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOff, LockKeyhole, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { authLogin } from "@/services/authService";
import { toast } from "sonner";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<loginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (data: loginValues) => {
    setLoading(true);
    try {
      const response = await authLogin(data);

      if (response.success) {
        toast.success(response.message);
        router.push("/dashboard");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
    } finally {
      setLoading(false);
      reset({});
    }
  };
  return (
    <>
      <AuthCard title="Login" subHeading="Login to access the JobLogs platform">
        <form onSubmit={handleSubmit(handleLogin)} noValidate>
          <div>
            <label className="form-label" htmlFor="">
              Email
            </label>
            <div className="form-input-container mt-1">
              <Mail size={22} />
              <input
                {...register("email")}
                placeholder="Enter your email"
                className={`form-input`}
              />
            </div>
            <p className="form-error min-h-5">
              {errors.email && errors.email.message}
            </p>
          </div>
          <div className="">
            <label htmlFor="">Password</label>
            <div className="form-input-container mt-1 items-center">
              <LockKeyhole size={22} />
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="Enter your password"
                className={`form-input ${errors.password && "border-red-400!"}`}
              />
              <span
                className="text-slate-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeIcon size={21} /> : <EyeOff size={21} />}
              </span>
            </div>
            <p className="form-error min-h-5">
              {errors.password && errors.password.message}
            </p>
          </div>

          <div className="space-y-3 pt-1">
            <Link
              className="text-[15px] flex underline text-slate-300"
              href={"/forgot-password"}
            >
              Forgot Password ?
            </Link>
            <button type="submit" className="auth-btn mt-2">
              {loading ? "loading..." : "Login"}
            </button>

            <span className="flex justify-center text-[15px] text-slate-300 font-medium mt-2.5">
              Don{"'"}t have an account ? &nbsp;
              <Link className="text-white underline" href={"/"}>
                Register
              </Link>
            </span>
          </div>
        </form>
      </AuthCard>
    </>
  );
};

export default LoginForm;
