import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useForm } from "react-hook-form";
import { UserUpdatePayload, userUpdateSchema } from "../types/user.types";
import { zodResolver } from "@hookform/resolvers/zod";
import useToast from "../hooks/useToast";
import { updateUser } from "../services/user.service";

export const ProfileUpdate = () => {
  const { user, update } = useAuthContext();
  const [isEditActive, setIsEditActive] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserUpdatePayload>({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      password: "",
    },
  });
  const { showToast } = useToast();

  const onSubmit = async (data: UserUpdatePayload) => {
    try {
      const updates: UserUpdatePayload = {};

      if (data.firstName && data.firstName !== user?.firstName) {
        updates.firstName = data.firstName;
      }

      if (data.lastName && data.lastName !== user?.lastName) {
        updates.lastName = data.lastName;
      }

      if (data.password && data.password !== user?.password) {
        updates.password = data.password;
      }

      if (Object.keys(updates).length === 0) {
        showToast("No changes to updates", "info");
        return;
      }
      const result = await updateUser(updates);
      update(result.user);
      showToast(result.message || "Update successful", "success");
      setIsEditActive(false);
    } catch (err: any) {
      showToast(err.message || "Update Failed", "error");
    }
  };

  return (
    <div className="p-2">
      <div className="w-full sm:max-w-4xl xl:max-w-5xl mx-auto mt-8 p-4 py-6 sm:p-6 bg-white rounded-xl">
        <div className="flex justify-between items-center">
          <div className="flex justify-between gap-2 sm:gap-4 items-center">
            <div className="rounded-full bg-[#3abab3]  transition duration-300  text-white font-bold text-2xl  flex items-center justify-center w-14 h-14 sm:w-20 sm:h-20 ">
              {user?.firstName?.[0]?.toUpperCase()}
            </div>
            <div>
              <h2 className="font-bold">
                {user?.firstName + " " + user?.lastName}
              </h2>
              <h3 className="text-sm text-black/70">{user?.email}</h3>
            </div>
          </div>
          {isEditActive ? (
            <button
              className="py-2 px-6 bg-red-400 text-white/90 text-sm hover:text-white rounded-lg"
              onClick={() => setIsEditActive(false)}
            >
              Cancel
            </button>
          ) : (
            <button
              className="py-2 px-6 bg-[#3abab3] text-white/90 text-sm hover:text-white rounded-lg"
              onClick={() => setIsEditActive(true)}
            >
              Edit
            </button>
          )}
        </div>
        <div className="mt-8">
          <form
            className="grid sm:grid-cols-2 gap-4 sm:gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-2">
              <label>First Name</label>
              <input
                className="bg-gray-100 rounded-lg py-2.5 px-4 disabled:bg-gray-200 disabled:text-black/60"
                placeholder="Update your first name"
                {...register("firstName")}
                disabled={!isEditActive}
              />
              {errors.firstName && (
                <p className="text-xs text-red-800">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label>Last Name</label>
              <input
                className="bg-gray-100 rounded-lg py-2.5 px-4 disabled:bg-gray-200 disabled:text-black/60"
                placeholder="Update your last name"
                {...register("lastName")}
                disabled={!isEditActive}
              />
              {errors.lastName && (
                <p className="text-xs text-red-800">
                  {errors.lastName.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label>Password</label>
              <input
                className="bg-gray-100 rounded-lg py-2.5 px-4 disabled:bg-gray-200 disabled:text-black/60"
                placeholder="Update your password"
                {...register("password")}
                disabled={!isEditActive}
              />
              {errors.password && (
                <p className="text-xs text-red-800">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                className="py-2 px-6 bg-[#3abab3] disabled:bg-gray-100 w-full sm:max-w-32 text-center rounded-lg"
                disabled={!isEditActive}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
