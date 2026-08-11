import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";

import { registerSchema } from "../validation/authSchema";
import { registerUser } from "../services/authService";

export default function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
  try {
    setLoading(true);

    console.log("Sending:", data);

    const response = await registerUser(data);

    console.log("Response:", response);

    toast.success("Registration Successful!");

    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);

  } catch (error) {
    console.log("ERROR:", error);
    console.log("ERROR RESPONSE:", error.response);

    toast.error(
      error.response?.data?.message || error.message || "Registration Failed"
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
          Create Account
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Join FinSmart AI
        </p>

        {/* Full Name */}

        <div className="mt-6">

          <label>Full Name</label>

          <input
            type="text"
            {...register("fullName")}
            className="w-full border rounded-xl p-3 mt-2"
            placeholder="Enter Full Name"
          />

          <p className="text-red-500 text-sm">
            {errors.fullName?.message}
          </p>

        </div>

        {/* Email */}

        <div className="mt-4">

          <label>Email</label>

          <input
            type="email"
            {...register("email")}
            className="w-full border rounded-xl p-3 mt-2"
            placeholder="Enter Email"
          />

          <p className="text-red-500 text-sm">
            {errors.email?.message}
          </p>

        </div>

        {/* Password */}

        <div className="mt-4">

          <label>Password</label>

          <div className="flex items-center border rounded-xl mt-2 px-3">

            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className="w-full p-3 outline-none"
              placeholder="Enter Password"
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

          <p className="text-red-500 text-sm">
            {errors.password?.message}
          </p>

        </div>

        <button
          disabled={loading}
          className="w-full mt-8 bg-teal-600 text-white py-4 rounded-xl hover:bg-teal-700"
        >
          {loading ? "Creating Account..." : "REGISTER"}
        </button>

        <p className="text-center mt-6">

          Already have an account?

          <Link
            to="/"
            className="text-teal-600 ml-2"
          >
            Login
          </Link>

        </p>

      </form>

    </div>
  );
}