"use client";
import AuthCard from "@/components/features/auth/AuthCard";
import { useForm } from "react-hook-form";
import { registerSchema, registerValues, responseType } from "@/types";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { EyeIcon, EyeOff, LockKeyhole, Mail, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { authRegister } from "@/services/authService";
import { toast } from "sonner";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setFocus,
  } = useForm<registerValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleRegister = async (data: registerValues) => {
    setLoading(true);

    try {
      const response: responseType = await authRegister(data);
      if (response.success) {
        toast.success(response.message);
        router.push("/");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
    } finally {
      reset();
      setLoading(false);
    }
  };

  return (
    <>
      <AuthCard
        title="Register"
        subHeading="Register to access the JobLogs platform"
      >
        <form onSubmit={handleSubmit(handleRegister)} className="">
          <div className="">
            <label className="form-label" htmlFor="">
              Name
            </label>
            <div className="form-input-container mt-1">
              <User size={22} />
              <input
                {...register("name")}
                placeholder="Enter your name"
                className={`form-input`}
              />
            </div>
            <p className="form-error min-h-5">
              {errors.name && errors.name.message}
            </p>
          </div>
          <div className="">
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
          <button type="submit" className="auth-btn" disabled={loading}>
            {!loading ? "Register" : "Registering..."}
          </button>

          <span className="flex justify-center text-[15px] text-slate-300 font-medium mt-6">
            Already have an account ? &nbsp;
            <Link className="text-white underline" href={"/login"}>
              Login
            </Link>
          </span>
        </form>
      </AuthCard>
    </>
  );
};

export default RegisterForm;
