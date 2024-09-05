import Link from "next/link";
import { ChangePasswordForm } from "./forms/change-password";
import { ProfileUpdateForm } from "./forms/profile-update";

export const SettingsScreen = () => {
  return (
    <div className="">
      <div className="text-center">
        <h2 className="leading-[30px] text-brand font-bold text-[20px] mb-[1.3rem]">
          Settings
        </h2>

        <div className="flex flex-row items-center justify-center gap-16 mt-8">
          <span className="text-brand text-center items-center justify-center font-normal text-[20px] leading-[16.8px] bg-[#FDE8E9] m-w-[169px] rounded-[5px] p-3 gap-[5px] shadow-md ">
            <Link href="/app/settings">Your Account</Link>
          </span>

          <span className="text-brand text-center items-center justify-center font-normal text-[20px] leading-[16.8px] ">
            <Link href="/app/settings">User Management</Link>
          </span>
        </div>
      </div>
      <div className="ml-5 my-20">
        <div className="my-5">
          <h2 className="leading-[30px] text-brand font-normal text-[20px] mb-[1.3rem]">
            Account Information
          </h2>
          <ProfileUpdateForm />
        </div>
        <div className="mt-10">
          <h2 className="leading-[30px] text-brand font-normal text-[20px] mb-[1.3rem]">
            Change Password
          </h2>
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
};
