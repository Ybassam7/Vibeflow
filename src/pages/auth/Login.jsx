import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label, TextInput, Alert as FlowbiteAlert } from "flowbite-react";
import { HiInformationCircle, HiMail, HiLockClosed } from "react-icons/hi";

import Alert from "../../components/ui/Alert";
import Button from "../../components/ui/Button";
import { AuthContext } from "../../context/AuthContext";

const defaultValues = {
  email: "",
  password: "",
};

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Must be a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export default function Login() {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState(null);
  const { setToken } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    resolver: zodResolver(schema),
  });

  async function logData(data) {
    try {
      const { data: response } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/signin`,
        data,
      );
      if (response.message === "success") {
        setApiError(null);
        localStorage.setItem("token", response.token);
        setToken(response.token);
        navigate("/");
      } else if (response.error) {
        throw new Error(response.error);
      }
    } catch (error) {
      console.log(error);
      setApiError(error.response?.data?.error || "Invalid credentials");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <form
        className="flex w-full max-w-md flex-col gap-6 rounded-2xl border border-white/10 bg-gray-900/50 backdrop-blur-xl p-8 sm:p-10 shadow-2xl"
        onSubmit={handleSubmit(logData)}
      >
        <div className="text-center mb-2">
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-400 text-sm">
            Please enter your details to sign in
          </p>
        </div>

        {apiError && (
          <FlowbiteAlert color="failure" icon={HiInformationCircle}>
            {apiError}
          </FlowbiteAlert>
        )}

        <div className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" className="text-gray-300">
                Email Address
              </Label>
            </div>
            <TextInput
              id="email"
              type="text"
              icon={HiMail}
              placeholder="name@email.com"
              {...register("email")}
              className="[&_input]:bg-gray-800/50 [&_input]:border-gray-700 [&_input]:text-white [&_input]:focus:ring-blue-500"
            />
            <Alert error={errors.email?.message} />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" className="text-gray-300">
                Password
              </Label>
            </div>
            <TextInput
              id="password"
              type="password"
              icon={HiLockClosed}
              placeholder="••••••••"
              {...register("password")}
              className="[&_input]:bg-gray-800/50 [&_input]:border-gray-700 [&_input]:text-white [&_input]:focus:ring-blue-500"
            />
            <Alert error={errors.password?.message} />
          </div>
        </div>

        <Button
          type="submit"
          isLoading={isSubmitting}
          className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-1"
        >
          Sign In
        </Button>

        <p className="text-center text-sm text-gray-400 mt-2">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-blue-400 hover:text-blue-300 hover:underline transition-colors"
          >
            Create account
          </Link>
        </p>
      </form>
    </div>
  );
}
