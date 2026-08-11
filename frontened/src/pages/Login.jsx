import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { loginSchema } from "../validation/authSchema";
import { loginUser } from "../services/authService";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const result = await loginUser(data);

      localStorage.setItem("token", result.token);

      toast.success("Login Successful!");

      navigate("/dashboard");

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Login Failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-teal-50 flex justify-center items-center">

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-xl rounded-3xl p-10 w-[450px]"
      >

        <h1 className="text-4xl font-bold text-center">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Login to your account
        </p>

        {/* Email */}

        <div className="mt-8">

          <label>Email</label>

          <div className="flex items-center border rounded-full px-5 py-4 mt-2">

            <FaEnvelope />

            <input
              type="email"
              placeholder="Enter Email"
              className="ml-3 w-full outline-none"
              {...register("email")}
            />

          </div>

          <p className="text-red-500 text-sm mt-1">
            {errors.email?.message}
          </p>

        </div>

        {/* Password */}

        <div className="mt-5">

          <label>Password</label>

          <div className="flex items-center border rounded-full px-5 py-4 mt-2">

            <FaLock />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              className="ml-3 w-full outline-none"
              {...register("password")}
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>

          </div>

          <p className="text-red-500 text-sm mt-1">
            {errors.password?.message}
          </p>

        </div>

        <button
          disabled={loading}
          className="mt-8 w-full bg-teal-600 hover:bg-teal-700 text-white py-4 rounded-full font-semibold"
        >
          {loading ? "Logging in..." : "LOGIN"}
        </button>

        <p className="text-center mt-6">

          Don't have an account?

          <Link
            to="/register"
            className="text-teal-600 ml-2"
          >
            Register
          </Link>

        </p>

      </form>

    </div>
  );
}