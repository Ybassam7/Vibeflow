import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  HiInformationCircle,
  HiUser,
  HiMail,
  HiLockClosed,
  HiCalendar,
} from "react-icons/hi";
import {
  Label,
  Radio,
  TextInput,
  Datepicker,
  Alert as FlowbiteAlert,
} from "flowbite-react";

import Alert from "../../components/ui/Alert";
import Button from "../../components/ui/Button";

const defaultValues = {
  name: "",
  email: "",
  password: "",
  rePassword: "",
  dateOfBirth: "",
  gender: "",
};

const strongPasswordRegex = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
);

const schema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Name is required" })
      .min(3, { message: "Name must be at least 3 characters" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Must be a valid email address" }),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .regex(strongPasswordRegex, {
        message:
          "Password must be at least 8 characters long and contain 1 uppercase, 1 lowercase, 1 number, and 1 special char",
      }),
    rePassword: z.string().min(1, { message: "Please confirm your password" }),
    dateOfBirth: z.coerce
      .date()
      .refine((dob) => dob <= new Date(), {
        message: "Date of birth cannot be in the future",
      })
      .refine(
        (dob) => {
          const today = new Date();
          const minimumAge = new Date(
            today.getFullYear() - 18,
            today.getMonth(),
            today.getDate(),
          );
          return dob <= minimumAge;
        },
        { message: "You must be at least 18 years old" },
      ),
    gender: z.literal(["male", "female"], {
      message: "Please select a gender",
    }),
  })
  .refine((data) => data.rePassword, {
    message: "Please confirm your password",
    path: ["rePassword"],
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords don't match",
    path: ["rePassword"],
  });

export default function Register() {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm({
    defaultValues,
    resolver: zodResolver(schema),
  });

  async function postData(data) {
    try {
      const payload = { ...data };
      if (data.dateOfBirth) {
        const date = new Date(data.dateOfBirth);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        payload.dateOfBirth = `${month}-${day}-${year}`;
      }
      const { data: response } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/signup`,
        payload,
      );
      if (response.message === "success") {
        setApiError(null);
        navigate("/login");
      } else if (response.error) {
        throw new Error(response.error);
      }
    } catch (error) {
      console.log(error);
      setApiError(error.response?.data?.error || "Something went wrong");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh] py-10">
      <form
        className="flex w-full max-w-lg flex-col gap-5 rounded-2xl border border-white/10 bg-gray-900/50 backdrop-blur-xl p-8 sm:p-10 shadow-2xl"
        onSubmit={handleSubmit(postData)}
      >
        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2">
            Create an Account
          </h2>
          <p className="text-gray-400 text-sm">Join our community today</p>
        </div>

        {apiError && (
          <FlowbiteAlert color="failure" icon={HiInformationCircle}>
            {apiError}
          </FlowbiteAlert>
        )}

        {/* Grid for Name & Birth to save space */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Label htmlFor="username" className="text-gray-300 mb-2 block">
              Username
            </Label>
            <TextInput
              id="username"
              icon={HiUser}
              placeholder="John Doe"
              {...register("name")}
              className="[&_input]:bg-gray-800/50 [&_input]:border-gray-700 [&_input]:text-white [&_input]:focus:ring-blue-500"
            />
            <Alert error={errors.name?.message} />
          </div>

          <div>
            <Label htmlFor="dateOfBirth" className="text-gray-300 mb-2 block">
              Date of Birth
            </Label>
            <Controller
              name="dateOfBirth"
              control={control}
              render={({ field }) => (
                <Datepicker
                  {...field}
                  value={field.value ? new Date(field.value) : undefined}
                  onSelectedDateChanged={(date) => field.onChange(date)}
                  className="[&_input]:bg-gray-800/50 [&_input]:border-gray-700 [&_input]:text-white [&_input]:focus:ring-blue-500"
                />
              )}
            />
            <Alert error={errors.dateOfBirth?.message} />
          </div>
        </div>

        <div>
          <Label htmlFor="email" className="text-gray-300 mb-2 block">
            Email Address
          </Label>
          <TextInput
            id="email"
            icon={HiMail}
            placeholder="name@email.com"
            {...register("email")}
            className="[&_input]:bg-gray-800/50 [&_input]:border-gray-700 [&_input]:text-white [&_input]:focus:ring-blue-500"
          />
          <Alert error={errors.email?.message} />
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Label htmlFor="password" className="text-gray-300 mb-2 block">
              Password
            </Label>
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

          <div>
            <Label htmlFor="rePassword" className="text-gray-300 mb-2 block">
              Confirm Password
            </Label>
            <TextInput
              id="rePassword"
              type="password"
              icon={HiLockClosed}
              placeholder="••••••••"
              {...register("rePassword")}
              className="[&_input]:bg-gray-800/50 [&_input]:border-gray-700 [&_input]:text-white [&_input]:focus:ring-blue-500"
            />
            <Alert error={errors.rePassword?.message} />
          </div>
        </div>

        <fieldset className="flex flex-col gap-2 border border-gray-700 rounded-lg p-4 bg-gray-800/20">
          <legend className="text-sm font-medium text-gray-300 px-1">
            Gender
          </legend>
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <Radio
                id="male"
                value="male"
                {...register("gender")}
                className="text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-600"
              />
              <Label htmlFor="male" className="text-gray-300">
                Male
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Radio
                id="female"
                value="female"
                {...register("gender")}
                className="text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-600"
              />
              <Label htmlFor="female" className="text-gray-300">
                Female
              </Label>
            </div>
          </div>
          <Alert error={errors.gender?.message} />
        </fieldset>

        <Button
          type="submit"
          isLoading={isSubmitting}
          className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-1"
        >
          Create Account
        </Button>

        <p className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-400 hover:text-blue-300 hover:underline transition-colors"
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
