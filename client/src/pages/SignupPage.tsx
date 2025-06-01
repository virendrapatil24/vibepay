import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import AppLogo from "../assets/images/vibepay_logo.png";
import { SignupFormPayload, signupSchema } from "../types/user.types";
import { singup } from "../services/user.service";

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormPayload>({ resolver: zodResolver(signupSchema) });

  const onSubmit = async (data: SignupFormPayload) => {
    try {
      const result = await singup(data);
      console.log("Signup success:", result);
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6  bg-[linear-gradient(to_bottom,#000,#143d3b_40%,#3abab3_75%,#42e098_98%)]">
      <form
        className="w-full max-w-lg bg-gray-300 px-6 sm:px-12 py-8 rounded-lg shadow-md text-black/90 flex flex-col gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-2 justify-center items-center">
          <img src={AppLogo} className="h-12 w-12 rounded-lg" />
          <h2 className="font-semibold text-2xl">Create an account</h2>
        </div>

        <div className="flex flex-col gap-1 mt-2">
          <label className="text-black/70 font-medium">First Name</label>
          <input
            type="text"
            {...register("firstName")}
            className="border border-black/70 py-2 px-4 bg-gray-300 rounded-lg focus:outline-none focus:border-green-600 placeholder:text-black/60"
            placeholder="Enter your first name"
          />
          {errors.firstName && (
            <p className="text-xs text-red-800">{errors.firstName.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-black/70 font-medium">Last Name</label>
          <input
            type="text"
            {...register("lastName")}
            className="border border-black/70 py-2 px-4 bg-gray-300 rounded-lg focus:outline-none focus:border-green-600 placeholder:text-black/60"
            placeholder="Enter your last name"
          />
          {errors.lastName && (
            <p className="text-xs text-red-800">{errors.lastName.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-black/70 font-medium">Email</label>
          <input
            type="email"
            {...register("email")}
            className="border border-black/70 py-2 px-4 bg-gray-300 rounded-lg focus:outline-none focus:border-green-600 placeholder:text-black/60"
            placeholder="Enter your email address"
          />
          {errors.email && (
            <p className="text-xs text-red-800">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-black/70 font-medium">Phone No.</label>
          <input
            type="text"
            {...register("phone")}
            className="border border-black/70 py-2 px-4 bg-gray-300 rounded-lg focus:outline-none focus:border-green-600 placeholder:text-black/60"
            placeholder="Enter your phone number"
          />
          {errors.phone && (
            <p className="text-xs text-red-800">{errors.phone.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-black/70 font-medium">Password</label>
          <input
            type="password"
            {...register("password")}
            className="border border-black/70 py-2 px-4 bg-gray-300 rounded-lg focus:outline-none focus:border-green-600 placeholder:text-black/60"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-xs text-red-800">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="p-2 mt-4 bg-[linear-gradient(to_right,#3abab3,#42e098)] rounded-lg font-medium"
        >
          Create an account
        </button>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Log in
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
