"use client";
import { getUserProfile, updateUserProfile } from "@/services/userService";
import { JobDataSchema, UserProfile, UserProfileSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Info, Mail, User, User2 } from "lucide-react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const Page = () => {
  const [profileData, setProfileData] = useState({} as UserProfile);
  const [isFormEdit, setIsFormEdit] = useState<boolean>(false);
  const { register, handleSubmit,reset } = useForm<UserProfile>({
    resolver: zodResolver(UserProfileSchema),
    values: {
      name: profileData?.name || "",
      email: profileData?.email || "",
    },
  });

  const getProfileData = async () => {
    const result = await getUserProfile();

    if (result.success && result.data) {
      setProfileData(result.data);
      reset(result.data)
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  const onSubmit: SubmitHandler<UserProfile> = async (data: UserProfile) => {
    try {
      const result = await updateUserProfile(data);

      if (result.success && result.data) {
        toast.success(result.message);
      }
    } catch (err) {
    } finally {
      getProfileData()
      setIsFormEdit(false);
    }
  };

  return (
    <div className="w-full h-full flex justify-center px-2 py-4">
      <form
        className="bg-slate-950/10 border border-slate-50/10 shadow-lg rounded-xl w-150 h-full py-8 px-15 flex flex-col justify-between"
        onSubmit={(e) => e.preventDefault()}
      >
        <div>
          <div>
            <div className="flex items-center gap-x-4 mb-15">
              <span className="bg-amber-500/20 text-amber-300 p-2 rounded-full">
                <User2 size={28} />
              </span>
              <h3 className="text-xl font-semibold font-sans">User Profile</h3>
            </div>
          </div>
          <div className="flex-column">
            <label htmlFor="" className="form-label">
              Full Name
            </label>
            <div
              className={`form-input-container ${isFormEdit ? "bg-slate-800" : "bg-slate-800/60"}`}
            >
              <User />
              <input
                type="text"
                className="form-input"
                placeholder="Enter Your Full Name"
                disabled={!isFormEdit}
                {...register("name")}
              />
            </div>
          </div>
          <div className="flex-column mt-8 mb-5">
            <label htmlFor="" className="form-label">
              Email
            </label>
            <div
              className={`form-input-container ${isFormEdit ? "bg-slate-800" : "bg-slate-800/60"}`}
            >
              <Mail />
              <input
                type="email"
                className="form-input"
                placeholder="Enter your email"
                disabled={!isFormEdit}
                {...register("email")}
              />
            </div>
          </div>

          {!isFormEdit && (
            <div className="flex items-center gap-x-2 text-slate-200 font-sans">
              <Info size={18} />
              <span className="text-sm">
                Fields are read-only — click Edit Profile to make changes
              </span>
            </div>
          )}
        </div>

        <button
          onClick={() => {
            if (!isFormEdit) {
              setIsFormEdit(true);
            } else {
              handleSubmit(onSubmit)();
            }
          }}
          className={`p-2 rounded-md font-bold text-[15px] w-[90%] self-center ${isFormEdit ? "bg-indigo-600" : "bg-indigo-600/80"}`}
        >
          {isFormEdit ? "Save Changes " : "Edit Profile"}
        </button>
      </form>
    </div>
  );
};

export default Page;
