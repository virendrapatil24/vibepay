import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AppLogo from "../assets/images/vibepay_logo.png";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  const onSubmit = (data: LoginFormData) => {
    console.log("login done");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[linear-gradient(to_bottom,#000,#143d3b_40%,#3abab3_75%,#42e098_98%)]">
      <form
        className="w-full max-w-lg bg-gray-300 px-6 sm:px-12 py-8 rounded-lg shadow-md text-black/90 flex flex-col gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-2 justify-center items-center">
          <img src={AppLogo} className="h-12 w-12 rounded-lg" />
          <h2 className="font-semibold text-2xl">Welcome back 👋</h2>
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
          className="p-2 mt-4 bg-[linear-gradient(to_right,#3abab3,#42e098)] rounded-full font-medium"
        >
          Login
        </button>
        <p className="mt-2 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
