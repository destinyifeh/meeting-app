import Link from "next/link";
import { LoginForm } from "./form";

export const Login = () => {
  return (
    <div className="flex w-[32rem] flex-col items-center justify-center">
      <div>
        <h2 className="leading-[3.6rem] font-bold text-[2.4rem] mb-[1.3rem] text-brand">
          Welcome back! Log in to access your Super Admin Dashboard
        </h2>
        <LoginForm />
        <Link
          href="/auth/reset-password"
          className=" text-brand-text underline hover:text-gray-700 font-normal text-[1.4rem] leading-[16.8px] font-lato"
        >
          Forgot your password?
        </Link>
      </div>
    </div>
  );
};
