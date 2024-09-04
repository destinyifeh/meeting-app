"use client";
import { useState } from "react";
import {
  EmailSent,
  SuccessfulPasswordReset,
} from "./components/Password-reset-feedback";
import { SuperAdminForgotPasswordForm } from "./forms/forgot-form";
import { SuperAdminResetForgotPasswordForm } from "./forms/reset-form";

export const ResetPasswordPage = () => {
  const [currentScreen, setCurrentScreen] = useState("forgotPassword");

  const updateScreen = (screen: string) => {
    setCurrentScreen(screen);
  };
  return (
    <div className="flex w-[32rem] flex-col items-center justify-center">
      <div>
        {currentScreen === "emailSent" && (
          <EmailSent updateScreen={updateScreen} />
        )}
        {currentScreen === "forgotPassword" && (
          <SuperAdminForgotPasswordForm updateScreen={updateScreen} />
        )}
        {currentScreen === "resetPassword" && (
          <SuperAdminResetForgotPasswordForm updateScreen={updateScreen} />
        )}
        {currentScreen === "success" && <SuccessfulPasswordReset />}
      </div>
    </div>
  );
};
