"use client";

import { maskEmail } from "@vms/lib";
import { Button, CustomCountDown, OtpInputField, showToast } from "@vms/ui";
import { ErrorMessageProps } from "app/_types";
import classNames from "classnames";
import { jwtDecode } from "jwt-decode";
import { useRouter, useSearchParams } from "next/navigation";
import { useId, useState } from "react";
import { ServerResponse } from "~/auth/api/login";
import { useOtp } from "~/auth/api/otp";

type OptParams = {
  uid: string;
  uemail: string;
  id: string;
  q: string;
};

const Otp = () => {
  const searchParams = useSearchParams();
  const qOtp = searchParams.get("q") as string;
  const rememberMe = searchParams.get("remember") as string;

  const [enableResend, setEnabledResend] = useState(false);
  const [otp, setOpt] = useState(qOtp);
  const uniqId = useId();
  const router = useRouter();

  const onSuccess = (response: ServerResponse) => {
    const { exp } = jwtDecode(response.data?.accessToken);
    document.cookie = `rememberMe=${rememberMe};path=/;max-age=${exp};SameSite=Lax;`;
    document.cookie = `accessToken=${response.data.accessToken};path=/;max-age=${exp};SameSite=Lax;`;
    document.cookie = `role=${response?.data?.role};path=/;max-age=${exp};SameSite=Lax;`;
    showToast("Token verified successfully", "success");
    router.replace(`/app/tenants`);
  };

  const handleError = (error: Error) => {
    const obj = JSON.parse(error.message)?.error as ErrorMessageProps;
    showToast(obj.message, "error");
  };

  const otpHandle = useOtp({
    onSuccess,
    onError: handleError,
  });

  const verifyOtpHandler = () => {
    otpHandle.mutate({
      otp,
      userId: searchParams.get("uid") as string,
    });
  };

  const email = searchParams.get("uemail") as string;

  return (
    <div className="max-w-[401px]  flex flex-col justify-center items-center space-y-[1.3rem]">
      <h3 className="leading-[3.6rem] font-bold text-[2.4rem] text-black">
        OTP Verification
      </h3>

      <p className="text-[1.4rem] leading-[1.68rem] font-normal font-lato text-black">
        Enter OTP code sent to {`${maskEmail(email, false)}`}
      </p>
      <OtpInputField value={otp} onChange={(otp) => setOpt(`${otp}`)} />

      <p className="text-[1.4rem] leading-[16.8px] font-normal mb-6 font-lato text-black">
        Didn’t recieve OTP code?
      </p>

      <p className="text-[1.4rem] leading-[16.8px] font-normal block font-lato text-black">
        <span
          className={classNames(
            "text-error",
            enableResend ? "cursor-pointer" : "cursor-not-allowed"
          )}
          // onClick={handleResend}
        >
          Resend Code
        </span>{" "}
        in{" "}
        {
          <CustomCountDown
            otpExpiryTime={"1"}
            key={uniqId}
            expiredHandler={() => setEnabledResend(true)}
          />
        }
      </p>

      <Button
        type="button"
        variant="secondary"
        size="large"
        onClick={verifyOtpHandler}
        loading={otpHandle.isPending}
        disabled={otpHandle.isPending}
        className={classNames(
          otp && otp.length === 6
            ? "bg-brand-default text-brand hover:bg-brand-default cursor-pointer"
            : "cursor-not-allowed",
          "w-full font-lato  text-[16px] leading-[19.2px]",
          otpHandle.isPending && "opacity-60"
        )}
      >
        Verify & Proceed
      </Button>
    </div>
  );
};
export default Otp;
