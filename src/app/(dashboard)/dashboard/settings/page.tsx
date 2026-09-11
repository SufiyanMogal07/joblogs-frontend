"use client";
import { updateEmailNotification } from "@/services/user.service";
import { useUserStore } from "@/stores/useUserStore";
import { Bell } from "lucide-react";
import { toast } from "sonner";
const Page = () => {
  const { user, setUser } = useUserStore();

  const handleChange = async (checked: boolean) => {
    const flag = confirm(
      checked
        ? "Are you sure you want to enable email notifications?"
        : "Are you sure you want to disable email notifications?",
    );

    if (flag) {
      const result = await updateEmailNotification({ isEnabled: checked });

      if (result.success) {
        const newValue = result.data?.emailNotification ?? checked;

        setUser({
          ...user!,
          emailNotification: newValue,
        });
        toast.success(result.message);
      }
    }
  };

  return (
    <div className="w-full h-full flex justify-center px-2 py-4 text-text">
      <form className="w-full max-w-150 border border-border rounded-xl px-5 py-8 md:px-10">
        <div className="flex items-center gap-3 pb-6 mb-2 border-b border-border/50">
          <span className="text-indigo-400">
            <Bell size={24} />
          </span>

          <h3 className="text-xl font-semibold">Notifications</h3>
        </div>

        <div className="flex items-center justify-between py-6">
          <div>
            <label htmlFor="email-checkbox" className="text-[16px] font-medium">
              Email notifications
            </label>
            <p className="text-[14px] text-text/60 mt-1">
              Receive reminders about your job applications.
            </p>
          </div>

          {user && (
            <input
              type="checkbox"
              id="email-checkbox"
              checked={user.emailNotification ?? false}
              onChange={(e) => handleChange(e.target.checked)}
              className="w-4 h-4 accent-indigo-500 cursor-pointer"
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default Page;
