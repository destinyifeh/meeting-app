import { Button } from "@vms/ui";
import { useRouter } from "next/navigation";
import React from "react";

type Emailprops = {
  updateScreen: (value: string) => void;
};
export const SuccessfulPasswordReset: React.FC = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col">
      <div className="mb-5">
        <h2 className="leading-[3.6rem] font-bold text-[2.4rem] mb-[1.3rem] text-center">
          Password Reset Successful
        </h2>
        <div className="w-[370px]">
          <p className="text-brand text-center font-normal text-[1.4rem] leading-[16.8px]">
            Congratulations! Your password has been changed. Click continue to
            login.
          </p>
        </div>
      </div>

      <Button
        type="button"
        variant="danger"
        size="large"
        className="w-full"
        onClick={() => router.push("/auth/login")}
      >
        Continue
      </Button>
    </div>
  );
};

export function EmailSent({ updateScreen }: Emailprops): React.JSX.Element {
  const onEmailResend = () => {
    console.log("resending....");
    window.alert("Testing 1-2...");
  };

  const onContinue = () => {
    updateScreen("resetPassword");
  };
  return (
    <div className="flex flex-col">
      <div className="mb-5">
        <h2 className="leading-[3.6rem] font-bold text-[2.4rem] mb-[1.3rem] text-center">
          Check Your Email
        </h2>
        <div className="w-[350px]">
          <p className="text-brand text-center font-normal text-[1.4rem] leading-[16.8px]">
            We've sent a password reset link to B***s**@gmail.com. Please check
            your inbox and follow the instructions to reset your password
          </p>
        </div>
      </div>

      <Button
        type="button"
        variant="danger"
        size="large"
        className="w-full"
        onClick={onContinue}
      >
        Continue
      </Button>
      <div className="mt-5 text-center select-none">
        <span className="text-brand text-center font-normal text-[1.4rem] leading-[16.8px]">
          {" "}
          <span
            className="text-[#ED1C24] cursor-pointer select-none mr-2 active:text-red-700 hover:text-red-700"
            onClick={onEmailResend}
          >
            * click here
          </span>
          <span className="text-brand">to resend the email.</span>
        </span>
      </div>
    </div>
  );
}
